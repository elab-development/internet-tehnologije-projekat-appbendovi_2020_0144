import React, {useEffect} from 'react';
import Header from "../komponente/Header";
import {Accordion, Col, Row} from "react-bootstrap";
import server from "../server";

const Repertoar = () => {

    const [bendovi, setBendovi] = React.useState([]);
    const [izabraniBend, setIzabraniBend] = React.useState(null);
    const [songs, setSongs] = React.useState([]);

    const komentari = [
        'Ovaj bend je najbolji bend ikada',
        'Svaka pesma je hit',
        'Sviraju sve pesme koje volim',
        'Sjajno smo proveli veče uz ovaj bend',
    ];

    const [testemonials, setTestemonials] = React.useState([]);

    useEffect(() => {
        server.get('https://randomuser.me/api/?results=4').then(res => {
            console.log(res.data.results);
            let data = res.data.results.map((user, index) => {
                return {
                    name: user.name.first + ' ' + user.name.last,
                    image: user.picture.large,
                    comment: komentari[index]
                }
            })
            setTestemonials(data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        server.get("/bands").then(res => {
            console.log(res.data);
            setBendovi(res.data.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const ucitajBend = (bend) => {
        setIzabraniBend(bend);
    }

    useEffect(() => {
        if (izabraniBend !== null) {
            server.get('/find-by-band/' + izabraniBend.id).then(res => {
                console.log(res.data);
                setSongs(res.data.data);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [izabraniBend]);

    return (
        <>
            <Header naslov="Repertoar" podnaslov="Pogledajte naš repertoar i rezervišite svoje mesto na vreme."/>

            <Row>
                <Col md={6}>
                    <Accordion defaultActiveKey="1">
                    {
                        bendovi.map(bend => (
                            <Accordion.Item eventKey={bend.id} onClick={() => {
                                ucitajBend(bend);
                            }}>
                                <Accordion.Header>{bend.name}</Accordion.Header>
                                <Accordion.Body>
                                    {bend.description}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))
                    }
                    </Accordion>
                </Col>

                <Col md={6}>

                        {
                           songs.map(song => (
                               <>
                                   <iframe className="m-1 p-1" id="iframe" src={
                                        "https://www.youtube.com/embed/" + song.video_id
                                      } allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title={song.name}></iframe>
                               </>
                           ))
                        }

                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <h2 className="text-center">Komentari</h2>
                </Col>

                    {
                        testemonials.map((testemonial, index) => (
                            <Col key={index} md={3}>
                                <div className="card m-1 p-1">
                                    <img src={testemonial.image} alt={testemonial.name} className="card-img-top"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{testemonial.name}</h5>
                                        <p className="card-text">{testemonial.comment}</p>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
            </Row>
        </>
    );
};

export default Repertoar;