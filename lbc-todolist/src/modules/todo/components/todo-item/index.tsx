import { toggleTodoCompletion, deleteTodoById, Todo } from "../../../../utils/reducers/todo.redux";
import DefaultButton from "../../../../utils/components/default-button";
import { formatDate } from "../../../../utils/date";
import Typography from "../../../../utils/components/typography";
import { Badge } from "react-bootstrap";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../utils/hooks";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleToggle = () => {
    const completedAt = todo.completedAt ? null : new Date(); // Set timestamp if completing
    dispatch(toggleTodoCompletion(todo.id, completedAt));
  };

  return (
    <tr>
      <td>
        <div className="todo-task-col">
          <input
            type="checkbox"
            checked={!!todo.completedAt} // If completedAt exists, it's checked
            onChange={handleToggle}
          />
          <Typography variant="body" noMargin className={todo.completedAt ? "completed" : ""}>
            {todo.text}
          </Typography>
          {todo.completedAt && <Badge pill bg="success">{t("completed")}</Badge>}
        </div>
      </td>
      <td>
        <Typography variant="body" noMargin>{formatDate(todo.createdAt)}</Typography>
      </td>
      <td>
        <Typography variant="body" noMargin>
          {todo.completedAt ? formatDate(todo.completedAt) : "-"}
        </Typography>
      </td>
      <td className="todo-actions">
        <DefaultButton label={t("delete")} variant="delete" onClick={() => dispatch(deleteTodoById(todo.id))} />
      </td>
    </tr>
  );
};

export default TodoItem;
