import React from 'react';
import useForm from "../useForm";
import server from "../server";
import Header from "../komponente/Header";
import {Col, Form, Row} from "react-bootstrap";

const Registracija = () => {
    const [formData, onChangeElement] = useForm({
        email: '',
        password: '',
        name: ''
    })

    const [poruka, setPoruka] = React.useState('Napravite vas nalog');

    const register = () => {
        server.post('/register', formData).then(res => {
            console.log(res.data);

            if (res.data.success) {
                setPoruka('Uspešno ste se registrovali');
            }else{
                setPoruka('Pogrešan email ili lozinka');
            }

        }).catch(err => {
            console.log(err);
            setPoruka('Pogrešan email ili lozinka');
        });
    }

    return (
        <>
            <Header naslov="Registracija" podnaslov={poruka}/>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" type="text" onChange={onChangeElement} placeholder="Unesite ime i prezime"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" onChange={onChangeElement} placeholder="Unesite email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" onChange={onChangeElement} placeholder="Unesite lozinku"/>
                    </Form.Group>
                    <hr/>
                    <button type="button" onClick={register} className="btn btn-dark">Registruj se</button>
                </Col>
            </Row>
        </>
    );
};

export default Registracija;