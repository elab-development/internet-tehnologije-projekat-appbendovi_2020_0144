import React, {useEffect} from 'react';
import Header from "../komponente/Header";
import {Col, Row, Table} from "react-bootstrap";
import server from "../server";
import {Chart} from "react-google-charts";

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
        </>
    );
};

export default Admin;