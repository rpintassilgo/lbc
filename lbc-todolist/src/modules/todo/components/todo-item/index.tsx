import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, Todo } from "../../../../utils/reducers/todo.redux";
import DefaultButton from "../../../../utils/components/default-button";
import { formatDate } from "../../../../utils/date";
import Typography from "../../../../utils/components/typography";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
        />
      </td>
      <td className={todo.completed ? "completed" : ""}><Typography variant="body" noMargin>{todo.text}</Typography></td>
      <td><Typography variant="body" noMargin>{formatDate(todo.createdAt)}</Typography></td>
      <td><Typography variant="body" noMargin>{todo.completed ? formatDate(new Date()) : "-"}</Typography></td>
      <td className="todo-actions">
        <DefaultButton label="Excluir" variant="delete" onClick={() => dispatch(deleteTodo(todo.id))} />
      </td>
    </tr>
  );
};

export default TodoItem;
