import React from "react";
import Button from "react-bootstrap/Button";
import "./styles.scss";
import Typography from "../typography";

interface DefaultButtonProps {
  label: string;
  variant?: "default" | "delete";
  onClick?: () => void;
  disabled?: boolean;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ label, variant = "default", onClick, disabled }) => {
  return (
    <Button
      variant={variant === "delete" ? "danger" : "primary"}
      className="btn"
      onClick={onClick}
      disabled={disabled}
    >
      <Typography variant="h6" className="btn-label" weight={disabled ? 'regular' : undefined} noMargin>
        {label}
      </Typography>
    </Button>
  );
};

export default DefaultButton;
