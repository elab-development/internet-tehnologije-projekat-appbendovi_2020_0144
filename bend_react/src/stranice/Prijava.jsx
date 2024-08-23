import React from 'react';
import Header from "../komponente/Header";
import {Col, Form, Row} from "react-bootstrap";
import useForm from "../useForm";
import server from "../server";

const Prijava = () => {

    const [formData, onChangeElement] = useForm({
        email: '',
        password: ''
    })

    const [poruka, setPoruka] = React.useState('Prijavite se kako biste mogli da rezervišete svoj bend na vreme.');

    const login = () => {
        server.post('/login', formData).then(res => {
            console.log(res.data);

            if (res.data.success) {
                window.sessionStorage.setItem('token', res.data.data.token);
                window.sessionStorage.setItem('user', JSON.stringify(res.data.data.user));
                window.location = '/';
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
            <Header naslov="Prijava" podnaslov={poruka}/>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" onChange={onChangeElement} placeholder="Unesite email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" onChange={onChangeElement} placeholder="Unesite lozinku"/>
                    </Form.Group>
                    <hr/>
                    <button type="button" onClick={login} className="btn btn-dark">Prijavi se</button>
                </Col>
            </Row>
        </>
    );
};

export default Prijava;