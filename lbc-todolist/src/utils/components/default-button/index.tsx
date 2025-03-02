import React from "react";
import Button from "react-bootstrap/Button";
import "./styles.scss"
import Typography from "../typography";

interface DefaultButtonProps {
  label: string;
  variant?: "default" | "delete";
  onClick?: () => void;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ label, variant = "default", onClick }) => {
  return (
    <Button
      className={`btn-default ${variant === "delete" ? "btn-delete" : ""}`}
      onClick={onClick}
    >
        <Typography variant="h6" className="btn-label">
            {label}
        </Typography>
    </Button>
  );
};

export default DefaultButton;
