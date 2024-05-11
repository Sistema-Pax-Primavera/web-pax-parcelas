import React from "react";
import "./parcelas.css";
import HeaderParcelas from "../components/header-parcelas";
import Parcela from '../assets/parcela.png'

const Parcelas = () => {
  return (
    <div className="container-parcelas">
      <HeaderParcelas />
      <div className="colunas-parcelas">
        <img src={Parcela}></img>
        <h1>Selecione uma opção do menu!</h1>
      </div>
    </div>
  );
};

export default Parcelas;
