import { Todo } from "../../../../utils/reducers/todo.redux";
import TodoItem from "../todo-item";
import "./styles.scss";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return todos.length > 0 ? (
    <table className="todo-table">
      <thead>
        <tr>
          <th></th> {/* Checkbox column */}
          <th>Tarefa</th>
          <th>Data de criação</th>
          <th>Data de conclusão</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  ) : (
    <p className="todo-empty">Nenhuma tarefa adicionada ainda.</p>
  );
};

export default TodoList;
