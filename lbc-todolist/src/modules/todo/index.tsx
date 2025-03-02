import { useSelector } from "react-redux";
import { ReducerState } from "../../utils/reducers";
import TodoInput from "./components/todo-input";
import TodoList from "./components/todo-list"
import Typography from "../../utils/components/typography";
import "./styles.scss"

const Todo = () => {
  const todos = useSelector((state: ReducerState) => state.todoReducer.todos);

  return (
    <div className="todo">
        <div className="todo-container">
        <Typography variant="h1" weight="bold">
            As minhas tarefas
        </Typography>
        <TodoInput />
        <TodoList todos={todos} />
        </div>
    </div>
  );
};

export default Todo;
