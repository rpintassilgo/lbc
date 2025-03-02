import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DefaultButton from "../default-button";
import Typography from "../typography";
import "./styles.scss"

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  tasksPerPage: number;
  setTasksPerPage: (tasks: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  tasksPerPage,
  setTasksPerPage
}) => {
  return (
    <div className="pagination-controls">
      <Typography variant="body">
        Página {currentPage} de {totalPages}
      </Typography>

      <div className="pagination-buttons">
        <DefaultButton 
          label="Anterior" 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
        />
        
        <Typography variant="body" className="pagination-page-number">
          {currentPage}
        </Typography>
        
        <DefaultButton 
          label="Seguinte" 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
        />

        <DropdownButton title={tasksPerPage.toString()} className="tasks-per-page-dropdown">
          {[8, 16, 24].map((size) => (
            <Dropdown.Item 
              key={size} 
              eventKey={size} 
              onClick={() => setTasksPerPage(size)}
            >
              {size}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </div>
  );
};

export default PaginationControls;
