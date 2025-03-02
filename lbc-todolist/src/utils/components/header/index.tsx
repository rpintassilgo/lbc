import React from "react";
import "./styles.scss";
import logo from "../../../assets/logotipo-LBC-transparente.png"
import i18n, { changeLanguage } from "../../i18n";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <header className="header">
        <div className="header-content">
            <img src={logo} alt="LBC Innovative Transformation" className="logo" />
            <DropdownButton title={i18n.language.toUpperCase()} variant="secondary" className="language-selector">
                <Dropdown.Item onClick={() => changeLanguage("en")}>🇬🇧 EN</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage("pt")}>🇵🇹 PT</Dropdown.Item>
            </DropdownButton>
        </div>
    </header>
  );
};

export default Header;
