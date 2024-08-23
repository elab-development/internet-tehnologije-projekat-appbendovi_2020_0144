import React, {useEffect} from 'react';
import Header from "../komponente/Header";
import {Accordion, Col, Row} from "react-bootstrap";
import server from "../server";

const Repertoar = () => {

    const [bendovi, setBendovi] = React.useState([]);
    const [izabraniBend, setIzabraniBend] = React.useState(null);
    const [songs, setSongs] = React.useState([]);

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
        </>
    );
};

export default Repertoar;