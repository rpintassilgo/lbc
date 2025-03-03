import { useTranslation } from "react-i18next";
import Typography from "../../../../components/typography";
import { Todo } from "../../../../reducers/todo.redux";
import TodoItem from "../todo-item";
import "./styles.scss";

const TodoList = ({ todos }: { todos: Todo[] }) => {
    const {t} = useTranslation()
  return todos.length > 0 ? (
    <div className="todo-table-wrapper">
      <table className="todo-table">
        <thead>
          <tr>
            <th><Typography variant="h6" weight="extrabold" noMargin>{t('task')}</Typography></th>
            <th><Typography variant="h6" weight="extrabold" noMargin>{t('creationDate')}</Typography></th>
            <th><Typography variant="h6" weight="extrabold" noMargin>{t('completionDate')}</Typography></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="todo-empty-container">
      <p className="todo-empty">{t('noTaskAdded')}</p>
    </div>
  );
};

export default TodoList;
