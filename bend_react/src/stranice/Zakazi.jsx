import React, {useEffect} from 'react';
import Header from "../komponente/Header";
import {Col, Form, Row} from "react-bootstrap";
import useForm from "../useForm";
import server from "../server";

const Zakazi = () => {

    const [poruka, setPoruka] = React.useState('Rezervišite svoje mesto na vreme');

    const [formData, onChangeElement] = useForm({
        event_name: '',
        event_date: '',
        location: '',
        band_id: 1,
        band_song_id: 1
    });

    const [bendovi, setBendovi] = React.useState([]);

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    React.useEffect(() => {
        server.get('/bands').then(res => {
            console.log(res.data);
            setBendovi(res.data.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const [osvezi, setOsvezi] = React.useState(false);

    const zakazi = () => {
        server.post('/events', {
            ...formData,
            user_id: user.id
        }).then(res => {
            console.log(res.data);
            setPoruka('Uspešno ste zakazali dogadjaj');
            setOsvezi(!osvezi);
        }).catch(err => {
            console.log(err);
            setPoruka('Došlo je do greške');
        });
    }

    const [myEvents, setMyEvents] = React.useState([]);
    const [izabraniDogjadjaj, setIzabraniDogadjaj] = React.useState(null);


    useEffect(() => {
        server.get('/my-events/' + user.id).then(res => {
            console.log(res.data);
            setMyEvents(res.data.data);
            if (res.data.data.length > 0) {
                setIzabraniDogadjaj(res.data.data[0]);
            }
        }).catch(err => {
            console.log(err);
        });
    }, [user.id, osvezi]);


    const [izabranePesme, setIzabranePesme] = React.useState([]);
    const [osveziDogadjaje, setOsveziDogadjaje] = React.useState(false);

    useEffect(() => {
        if (izabraniDogjadjaj !== null) {
            server.get('/chosen-songs-by-event/' + izabraniDogjadjaj).then(res => {
                console.log(res.data);
                setIzabranePesme(res.data.data);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [izabraniDogjadjaj, osveziDogadjaje]);

    const [bandSongs, setBandSongs] = React.useState([]);

    useEffect(() => {
        if (izabraniDogjadjaj !== null) {
            server.get('/band-songs').then(res => {
                console.log(res.data);
                setBandSongs(res.data.data);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [izabraniDogjadjaj]);

    const ubaciPesmu = () => {
        server.post('/chosen-songs', {
            event_id: izabraniDogjadjaj,
            band_song_id: formData.band_song_id
        }).then(res => {
            console.log(res.data);
            setOsveziDogadjaje(!osveziDogadjaje);
            setPoruka('Uspešno ste dodali pesmu');
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <>
            <Header naslov="Zakazi" podnaslov={poruka}/>

            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Naziv dogadjaja</Form.Label>
                        <Form.Control name="event_name" onChange={onChangeElement} type="text" placeholder="Unesite naziv dogadjaja"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Datum dogadjaja</Form.Label>
                        <Form.Control name="event_date" onChange={onChangeElement} type="date" placeholder="Unesite datum dogadjaja"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Lokacija dogadjaja</Form.Label>
                        <Form.Control name="location" onChange={onChangeElement} type="text" placeholder="Unesite lokaciju dogadjaja"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Izaberite bend</Form.Label>
                        <Form.Select name="band_id" onChange={onChangeElement}>
                            {
                                bendovi.map(bend => (
                                    <option key={bend.id} value={bend.id}>{bend.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <hr/>
                    <button onClick={zakazi} type="button" className="btn btn-dark">Zakazi</button>
                </Col>

                <Col>
                    <h3>Moji dogadjaji</h3>
                    <ul>
                        {
                            myEvents.map(event => (
                                <li key={event.id}>{event.event_name} - {event.event_date} - {event.location}</li>
                            ))
                        }
                    </ul>
                    <hr/>
                    <Form.Select onChange={
                        (e) => {
                            const id = e.target.value;
                            setIzabraniDogadjaj(id);
                        }
                    }>
                        {
                            myEvents.map(event => (
                                <option key={event.id} value={event.id}>{event.event_name}</option>
                            ))
                        }
                    </Form.Select>

                    <h3>Pesme</h3>
                    <ul>
                        {
                            izabranePesme.map(song => (
                                <li key={song.id}>{song.band_song.name}</li>
                            ))
                        }
                    </ul>
                    <hr/>
                    <Form.Select name="band_song_id" onChange={
                        onChangeElement
                    }>
                        {
                            bandSongs.map(song => (
                                <option key={song.id} value={song.id}>{song.name}</option>
                            ))
                        }
                    </Form.Select>
                    <hr/>
                    <button onClick={ubaciPesmu} type="button" className="btn btn-dark">Ubaci pesmu</button>
                </Col>
            </Row>
        </>
    );
};

export default Zakazi;