import { useState, useEffect } from "react";
import { ReducerState } from "../../utils/reducers";
import { fetchAllTodos } from "../../utils/reducers/todo.redux";
import TodoInput from "./components/todo-input";
import TodoList from "./components/todo-list";
import Typography from "../../utils/components/typography";
import "./styles.scss";
import PaginationControls from "../../utils/components/pagination-controls";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const Todo = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: ReducerState) => state.todo.todos);

  // Load todos on mount
  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(8);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(todos.length / tasksPerPage));

  // Paginate Todos
  const indexOfLastTodo = currentPage * tasksPerPage;
  const indexOfFirstTodo = indexOfLastTodo - tasksPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle tasks per page change
  const handleTasksPerPageChange = (tasks: number) => {
    setTasksPerPage(tasks);
    setCurrentPage(1); // Reset to page 1 when changing tasks per page
  };

  return (
    <div className="todo-container">
      
      {/* HEADER */}
      <div className="todo-header">
        <Typography variant="h1" weight="bold" className="title">
          {t('myTasks')}
        </Typography>
        <TodoInput 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
          tasksPerPage={tasksPerPage} 
          setTasksPerPage={handleTasksPerPageChange} 
        />
      </div>

      {/* SCROLLABLE TASK LIST */}
      <div className="todo-list-container">
        <TodoList todos={currentTodos} />
      </div>

      {/* FOOTER WITH PAGINATION CONTROLS */}
      <div className="pagination-footer">
        <Typography variant="body" weight="semibold">
          {t('totalTasks', { total: todos.length })}
        </Typography>
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          tasksPerPage={tasksPerPage}
          setTasksPerPage={handleTasksPerPageChange}
        />
      </div>
    </div>
  );
};

export default Todo;
