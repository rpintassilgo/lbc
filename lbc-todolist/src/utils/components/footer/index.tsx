import React from "react";
import "./styles.scss";
import logo from "../../../assets/logotipo-LBC-transparente.png"
import Typography from "../typography";

type FooterProps = {
    label: string;
};

const Footer: React.FC<FooterProps> = ({ label }) => {
  return (
    <footer className="footer">
        <div className="footer-content">
            <img src={logo} alt="LBC" className="logo" />
            <Typography variant="body" className="footer-text">
                Exercício desenvolvido por: {label}
            </Typography>
        </div>
    </footer>
  );
};

export default Footer;
