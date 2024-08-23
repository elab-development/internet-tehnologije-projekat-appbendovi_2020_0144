import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Navigacija = () => {

    const token = window.sessionStorage.getItem('token');

    const user = token !== null ? JSON.parse(window.sessionStorage.getItem('user')) : null;
    const role = user !== null ? user.role : null;

    const logout = () => {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('user');
        window.location = '/';
    }

    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="/">Bendovi.rs</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Pocetna</Nav.Link>
                        <Nav.Link href="/repertoar">Repertoar</Nav.Link>
                        {
                            token === null ? (
                                <>
                                    <Nav.Link href="/prijava">Prijava</Nav.Link>
                                    <Nav.Link href="/registracija">Registracija</Nav.Link>
                                </>
                            ) : (
                                <>
                                    {
                                        <>
                                            <Nav.Link href="/zakazi">Zakazi bend</Nav.Link>
                                        </>
                                    }
                                    {
                                        role === 'admin' ? (
                                            <Nav.Link href="/admin">Admin</Nav.Link>
                                        ) : null
                                    }
                                    <Nav.Link href="#" onClick={logout}>Odjava</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigacija;