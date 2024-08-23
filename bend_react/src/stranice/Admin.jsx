import React, {useEffect} from 'react';
import Header from "../komponente/Header";
import {Col, Form, Row, Table} from "react-bootstrap";
import server from "../server";
import {Chart} from "react-google-charts";
import useForm from "../useForm";

const Admin = () => {

    const [poruka, setPoruka] = React.useState('Ovde se nalaze sve admin funkcionalnosti');

    const [pesmePaginacija, setPesmePaginacija] = React.useState([]);
    const [url, setUrl] = React.useState('/paginacija');
    const [links, setLinks] = React.useState([]);
    const [osvezi, setOsvezi] = React.useState(false);

    const [chartData, setChartData] = React.useState([
        ['Dogadjaj', 'Broj pesama']
    ]);


    useEffect(() => {
        server.get('/chart-data').then(res => {
            console.log(res.data);
            let data = [
                ['Dogadjaj', 'Broj pesama']
            ];

            res.data.data.forEach(dogadjaj => {
                data.push([dogadjaj.event_name, parseInt(dogadjaj.total_songs)]);
            });

            setChartData(data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const obrisi = (id) => {
        server.delete('/chosen-songs/' + id).then(res => {
            console.log(res.data);
            setPoruka('Pesma je uspešno obrisana');
            setOsvezi(!osvezi);
        }).catch(err => {
            console.log(err);
            setPoruka('Došlo je do greške');
        });
    }

    useEffect(() => {
        server.get(url).then(res => {
            console.log(res.data);
            setPesmePaginacija(res.data.data.data);
            let linksFromServer = [];
            for (let i = 0; i < res.data.data.links.length; i++) {
                linksFromServer.push({
                    url: res.data.data.links[i].url,
                    label: res.data.data.links[i].label.replace('&laquo; Previous', 'Prethodna').replace('Next &raquo;', 'Sledeća'),
                    active : res.data.data.links[i].active
                });
            }

            setLinks(linksFromServer);
        }).catch(err => {
            console.log(err);
        });
    }, [url, osvezi]);

    const [formData, onChangeElement] = useForm({
        name: '',
        description: '',
        search: ''
    });

    const dodajBend = () => {
        server.post('/bands', {
            name: formData.name,
            description: formData.description
        }).then(res => {
            console.log(res.data);
            setOsveziBendove(!osveziBendove);
            setPoruka('Bend je uspešno dodat');
        }).catch(err => {
            console.log(err);
            setPoruka('Došlo je do greške');
        });
    }

    const [bands, setBands] = React.useState([]);
    const [osveziBendove, setOsveziBendove] = React.useState(false);

    useEffect(() => {
        server.get('/bands').then(res => {
            console.log(res.data);
            setBands(res.data.data);
        }).catch(err => {
            console.log(err);
        });
    }, [osveziBendove]);

    const [podaciSaTjuba, setPodaciSaTjuba] = React.useState([]);

    const pretrazi = (e) => {
        let search = formData.search

        if (search.length < 3) {
            return;
        }


        server.get('/search?search=' + search).then(res => {
            console.log(res.data);
            let podaci = [];

            res.data.items.forEach(pesma => {
                if (pesma.id.videoId !== undefined) {
                    podaci.push({
                        title: pesma.snippet.title,
                        videoId: pesma.id.videoId,
                    });  
                }
            });

            setPodaciSaTjuba(podaci);

        }).catch(err => {
            console.log(err);
        });
    }

    const dodajPesmuUBend = (pesma) => {
        server.post('/band-songs', {
            band_id: formData.band_id,
            name: pesma.title,
            video_id: pesma.videoId
        }).then(res => {
            console.log(res.data);
            setPoruka('Pesma je uspešno dodata');
            setOsvezi(!osvezi);
        }).catch(err => {
            console.log(err);
            setPoruka('Došlo je do greške');
        });
    }

    return (
        <>
            <Header naslov="Admin" podnaslov={poruka}/>

            <Row>
                <Col>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Naziv benda</th>
                                <th>Naziv pesme</th>
                                <th>Dogadjaj</th>
                                <th>Obrisi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pesmePaginacija && pesmePaginacija.map(pesma => (
                                    <tr key={pesma.id}>
                                        <td>{pesma.id}</td>
                                        <td>{pesma.band_name}</td>
                                        <td>{pesma.song_title}</td>
                                        <td>{pesma.event_name}</td>
                                        <td><button className="btn btn-danger" onClick={
                                            () => {
                                                obrisi(pesma.id);
                                            }
                                        }>Obrisi</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    {

                        links && links.map((link) => (
                            <button key={link.label} className={link.active ? 'm-1 btn btn-primary' : 'm-1 btn btn-secondary' } onClick={() => {
                                setUrl(link.url);
                            }} disabled={
                                link.url === null
                            }>{link.label}</button>
                        ))
                    }
                </Col>
            </Row>

            <Row>
                <Col>
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={chartData}
                        options={{
                            title: "Pesme po dogadjajima",
                            pieHole: 0.4,
                            is3D: false,
                        }}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Naziv benda</Form.Label>
                        <Form.Control onChange={onChangeElement} name="name" type="text" placeholder="Unesite naziv benda"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Opis benda</Form.Label>
                        <Form.Control onChange={onChangeElement} name="description" type="text" placeholder="Unesite opis benda"/>
                    </Form.Group>
                    <hr/>
                    <button onClick={dodajBend} type="button" className="btn btn-dark">Dodaj bend</button>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Izaberite bend</Form.Label>
                        <Form.Select onChange={onChangeElement} name="band_id">
                            {
                                bands.map(bend => (
                                    <option key={bend.id} value={bend.id}>{bend.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Pretrazite</Form.Label>
                        <Form.Control name="search" onChange={onChangeElement} type="text"/>
                    </Form.Group>


                    <hr/>
                    <button onClick={pretrazi} type="button" className="btn btn-dark">Pretrazi</button>

                    <hr/>

                    {
                        podaciSaTjuba.map(pesma => (
                            <>
                                <iframe className="m-1 p-1" id="iframe"
                                        src={`https://www.youtube.com/embed/${pesma.videoId}`} title={pesma.title}
                                        frameBorder="0" allowFullScreen></iframe>

                                <button className="btn btn-dark" onClick={() => {
                                    dodajPesmuUBend(pesma);
                                }
                                }>Dodaj pesmu</button>

                            </>
                        ))
                    }

                </Col>
            </Row>
        </>
    );
};

export default Admin;