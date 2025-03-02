import React from "react";
import "./styles.scss";
import logo from "../../../assets/logotipo-LBC-transparente.png"

const Header: React.FC = () => {
  return (
    <header className="header">
        <div className="header-content">
            <img src={logo} alt="LBC Innovative Transformation" className="logo" />
        </div>
    </header>
  );
};

export default Header;
