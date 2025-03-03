import { createElement, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Typography from "../typography";
import { X } from "react-bootstrap-icons";
import "./styles.scss"
import { useTranslation } from "react-i18next";


// Note: This toast could be implemented differently, however due to time constraints and giving that this is just
// a skill accessment test I did it this way. Ideally, we could use bootstrap's alert component and override its
// default SCSS variables to match figma and make it way more scalable. I would aso create a global ui state in redux
// to allow better control over multiple toasts instead of creating new DOM element each time.

const showToast = (message: string) => {
  const alertContainer = document.createElement("div");
  document.body.appendChild(alertContainer);
  const root = createRoot(alertContainer);

  const ToastComponent = () => {
    const {t} = useTranslation();
    const [show, setShow] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => {
          root.unmount();
          document.body.removeChild(alertContainer);
        }, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
      <div className="toast-alert">
        <Typography variant="h6" weight="semibold" className="toast-message" noMargin>
          {t(message)}
        </Typography>
        <X className="toast-close-icon" onClick={() => setShow(false)} />
      </div>
    );
  };

  root.render(createElement(ToastComponent));
};

export default showToast;
