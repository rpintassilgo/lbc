import Typography from "../../../../utils/components/typography";
import { Todo } from "../../../../utils/reducers/todo.redux";
import TodoItem from "../todo-item";
import "./styles.scss";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return todos.length > 0 ? (
    <div className="todo-table-wrapper">
      <table className="todo-table">
        <thead>
          <tr>
            <th><Typography variant="h6" weight="extrabold" noMargin>Tarefa</Typography></th>
            <th><Typography variant="h6" weight="extrabold" noMargin>Data de criação</Typography></th>
            <th><Typography variant="h6" weight="extrabold" noMargin>Data de conclusão</Typography></th>
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
    <p className="todo-empty">Nenhuma tarefa adicionada ainda.</p>
  );
};

export default TodoList;
