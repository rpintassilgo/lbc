import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, Todo } from "../../../../utils/reducers/todo.redux";
import DefaultButton from "../../../../utils/components/default-button";

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
      <td className={todo.completed ? "completed" : ""}>{todo.text}</td>
      <td>{new Date(todo.createdAt).toLocaleString()}</td>
      <td>{todo.completed ? new Date().toLocaleString() : "-"}</td>
      <td className="todo-actions">
        <DefaultButton label="Excluir" variant="delete" onClick={() => dispatch(deleteTodo(todo.id))} />
      </td>
    </tr>
  );
};

export default TodoItem;
