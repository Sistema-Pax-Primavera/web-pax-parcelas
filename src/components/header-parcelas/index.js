import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header-parcelas.css";

const HeaderParcelas = () => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (route) => {
    // Navegar para a rota específica
    navigate(route);
    // Salvar a rota no localStorage
    localStorage.setItem("page-parcela", route);
    // Atualizar a rota ativa
    setActiveRoute(route);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("page-parcela");

    if (savedPage && savedPage !== location.pathname) {
      localStorage.removeItem("page-parcela");
      setActiveRoute("");
    } else {
      setActiveRoute(savedPage);
    }
  }, [location.pathname]);


  return (
    <div className="container-header-cobranca">
      <button
        onClick={() => handleMenuClick("/mensalidade")}
        className={activeRoute === "/mensalidade" ? "active" : ""}
      >Mensalidade
      </button>
      
      

    </div>
  );
};

export default HeaderParcelas;
