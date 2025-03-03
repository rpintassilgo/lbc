import { useState } from 'react';
import { createNewTodo } from '../../../../reducers/todo.redux';
import DefaultButton from '../../../../components/default-button';
import './styles.scss';
import Typography from '../../../../components/typography';
import PaginationControls from '../../../../components/pagination-controls';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../utils/hooks';

const TodoInput = ({
  currentPage,
  totalPages,
  onPageChange,
  tasksPerPage,
  setTasksPerPage,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  tasksPerPage: number;
  setTasksPerPage: (tasks: number) => void;
}) => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(createNewTodo(input));
      setInput('');
    }
  };

  return (
    <div className='todo-input'>
      <Typography variant='body' className='title'>
        {t('taskDescription')}
      </Typography>
      <div className='todo-input-container'>
        <div className='todo-input-field'>
          <input
            className='input'
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
