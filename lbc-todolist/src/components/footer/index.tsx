import React from "react";
import "./styles.scss";
import logo from "../../assets/logotipo-LBC-transparente.png"
import Typography from "../typography";
import { useTranslation } from "react-i18next";

type FooterProps = {
    label: string;
};

const Footer: React.FC<FooterProps> = ({ label }) => {
    const {t} = useTranslation()
  return (
    <footer className="footer">
        <div className="footer-content">
            <img src={logo} alt="LBC" className="logo" />
            <Typography variant="body" className="footer-text">
                {t('exerciseDevelopedBy', { name: label })}
            </Typography>
        </div>
    </footer>
  );
};

export default Footer;
