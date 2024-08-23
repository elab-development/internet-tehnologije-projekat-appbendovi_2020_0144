import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigacija from "./komponente/Navigacija";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./stranice/Home";
import Repertoar from "./stranice/Repertoar";
import Prijava from "./stranice/Prijava";
import Registracija from "./stranice/Registracija";
import Zakazi from "./stranice/Zakazi";
import Admin from "./stranice/Admin";
import {Container} from "react-bootstrap";


function App() {
  return (
    <>
      <Navigacija />

       <Container>
           <BrowserRouter>
               <Routes>
                   <Route element={<Home/>} path="/" />
                   <Route element={<Repertoar/>} path="/repertoar" />
                   <Route element={<Prijava/>} path="/prijava" />
                   <Route element={<Registracija/>} path="/registracija" />
                   <Route element={<Zakazi/>} path="/zakazi" />
                   <Route element={<Admin/>} path="/admin" />
               </Routes>
           </BrowserRouter>
       </Container>

    </>
  );
}

export default App;
