import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DefaultButton from "../default-button";
import Typography from "../typography";
import "./styles.scss"
import { useTranslation } from "react-i18next";

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
    const {t} = useTranslation()
  return (
    <div className="pagination-controls">
      <Typography variant="body" className="pagination-page-info">
        {t('pageInfo', { currentPage, totalPages})}
      </Typography>

      <div className="pagination-buttons">
        <DefaultButton 
          label={t('previous')} 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
        />
        
        <Typography variant="body" className="pagination-page-number" noMargin>
          {currentPage}
        </Typography>
        
        <DefaultButton 
          label={t('next')} 
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
