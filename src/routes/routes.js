import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Parcelas from "../pages/parcelas";
import Mensalidade from "../pages/mensalidade";
import Gerador from "../pages/gerador";

const RoutesApp = () => (
    <BrowserRouter basename="pax-primavera/parcelas">
        <Routes>
            <Route exact path="/" element={<Parcelas />} />
            <Route exact path="/mensalidade" element={<Mensalidade />} />
            <Route exact path="/gerador" element={<Gerador />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;