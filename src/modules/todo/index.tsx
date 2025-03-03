import { useState, useEffect } from 'react';
import { ReducerState } from '../../reducers';
import { fetchAllTodos } from '../../reducers/todo.redux';
import TodoInput from './components/todo-input';
import TodoList from './components/todo-list';
import Typography from '../../components/typography';
import './styles.scss';
import PaginationControls from '../../components/pagination-controls';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const Todo = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: ReducerState) => state.todo.todos);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(8);

  const totalPages = Math.max(1, Math.ceil(todos.length / tasksPerPage));

  const indexOfLastTodo = currentPage * tasksPerPage;
  const indexOfFirstTodo = indexOfLastTodo - tasksPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTasksPerPageChange = (tasks: number) => {
    setTasksPerPage(tasks);
    setCurrentPage(1);
  };

  return (
    <div className='todo-container'>
      <div className='todo-header'>
        <Typography variant='h1' weight='bold' className='title'>
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

      <div className='todo-list-container'>
        <TodoList todos={currentTodos} />
      </div>

      <div className='pagination-footer'>
        <Typography variant='body' weight='regular' className='total-tasks'>
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
