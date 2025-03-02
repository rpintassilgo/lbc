import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../../utils/reducers/todo.redux";
import DefaultButton from "../../../../utils/components/default-button";
import "./styles.scss";
import Typography from "../../../../utils/components/typography";
import PaginationControls from "../../../../utils/components/pagination-controls";
import { useTranslation } from "react-i18next";

const TodoInput = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  tasksPerPage, 
  setTasksPerPage 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
  tasksPerPage: number; 
  setTasksPerPage: (tasks: number) => void; 
}) => {
    const {t} = useTranslation()
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  return (
    <div className="todo-input"> 
        <Typography variant="body" className="title">
            {t('taskDescription')}
        </Typography>
        <div className="todo-input-container">
            <div className="todo-input-field">
                <input
                    className="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('insertTask')}
                />
                <DefaultButton label={t('addTask')} onClick={handleAddTodo} />
            </div>
            <PaginationControls 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={onPageChange} 
              tasksPerPage={tasksPerPage} 
              setTasksPerPage={setTasksPerPage} 
            />
        </div>
    </div>
  );
};

export default TodoInput;
