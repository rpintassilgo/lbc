import { useSelector } from "react-redux";
import { useState } from "react";
import { ReducerState } from "../../utils/reducers";
import TodoInput from "./components/todo-input";
import TodoList from "./components/todo-list";
import Typography from "../../utils/components/typography";
import "./styles.scss";
import PaginationControls from "../../utils/components/pagination-controls";

const Todo = () => {
  const todos = useSelector((state: ReducerState) => state.todoReducer.todos);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(8);

  // Calculate total pages
  const totalPages = Math.ceil(todos.length / tasksPerPage);

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
          As minhas tarefas
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
            Total de tarefas: {todos.length}
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
