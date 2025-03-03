import React, { useState, useEffect } from "react";
import "./styles.scss";
import logo from "../../../assets/logotipo-LBC-transparente.png";
import { changeLanguage } from "../../utils/i18n";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Header: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(storedLanguage);
  }, []);

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="LBC Innovative Transformation" className="logo" />
        <DropdownButton title={currentLanguage.toUpperCase()}>
          <Dropdown.Item onClick={() => handleLanguageChange("en")}>🇬🇧 EN</Dropdown.Item>
          <Dropdown.Item onClick={() => handleLanguageChange("pt")}>🇵🇹 PT</Dropdown.Item>
        </DropdownButton>
      </div>
    </header>
  );
};

export default Header;
