import React from 'react';
import Header from "../komponente/Header";
import {Row} from "react-bootstrap";
import isidora from "../slike/isidora.enc";
import savina from "../slike/savina.enc";

const Home = () => {

    const reciNasihKreatora = [
        {
            id : 1,
            ime : "Isidora",
            slika : isidora,
            reci: 'Mi smo odlucili da ovaj sajt bude posvecen svim ljudima kojima je tesko da nadju bend za veselja. Nama je to bilo tesko, pa smo odlucili da napravimo ovaj sajt kako bi olaksali ljudima da nadju bend za veselja.'
        },
        {
            id : 2,
            ime : "Savina",
            slika : savina,
            reci: 'Nedavno smo se udruzili i odlucili da napravimo ovaj sajt. Isidora je dizajner, a ja sam programer. Isidora je dizajnirala ovaj sajt, a ja sam ga napravila. Nadamo se da ce vam se svideti.'
        }
    ];

    return (
        <>
            <Header naslov="Dobrodosli" podnaslov="Neka vase veselje pocne ovde" />

            <Row className="m-3">
                {
                    reciNasihKreatora.map(reci => (
                        <div className="col-lg-6" key={reci.id}>
                            <div className="card">
                                <img src={reci.slika} alt={reci.ime} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{reci.ime}</h5>
                                    <p className="card-text">{reci.reci}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Row>
        </>
    );
};

export default Home;