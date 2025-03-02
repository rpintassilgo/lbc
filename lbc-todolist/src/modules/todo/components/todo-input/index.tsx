import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../../utils/reducers/todo.redux";
import DefaultButton from "../../../../utils/components/default-button";
import "./styles.scss"
import Typography from "../../../../utils/components/typography";

const TodoInput = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  return (
    <div className="d-flex gap-2">
        <Typography variant="body">
            Descrição da tarefa:
        </Typography>
      <input
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <DefaultButton label="Adicionar Tarefa" onClick={handleAddTodo} />
    </div>
  );
};

export default TodoInput;
