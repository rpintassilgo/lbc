import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, Todo } from "../../../../utils/reducers/todo.redux";
import DefaultButton from "../../../../utils/components/default-button";
import { formatDate } from "../../../../utils/date";
import Typography from "../../../../utils/components/typography";
import { Badge } from "react-bootstrap";
import "./styles.scss"
import { useTranslation } from "react-i18next";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch();
  const {t} = useTranslation()

  return (
    <tr>
      <td>
        <div className="todo-task-col">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
        />
        <Typography variant="body" noMargin className={todo.completed ? "completed" : ""}>{todo.text}</Typography>
        {todo.completed && <Badge pill bg="success">Concluída</Badge>}
        </div>
      </td>
      <td><Typography variant="body" noMargin>{formatDate(todo.createdAt)}</Typography></td>
      <td><Typography variant="body" noMargin>{todo.completed ? formatDate(new Date()) : "-"}</Typography></td>
      <td className="todo-actions">
        <DefaultButton label={t('delete')} variant="delete" onClick={() => dispatch(deleteTodo(todo.id))} />
      </td>
    </tr>
  );
};

export default TodoItem;
