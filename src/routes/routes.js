import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Parcelas from "../pages/parcelas";

const RoutesApp = () => (
    <BrowserRouter basename="pax-primavera/parcelas">
        <Routes>
            <Route exact path="/" element={<Parcelas />} />
        </Routes>
    </BrowserRouter>
);

export default RoutesApp;