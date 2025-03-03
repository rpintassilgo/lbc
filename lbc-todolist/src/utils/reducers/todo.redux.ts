import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { ReducerThunk } from ".";
import { getTodos, createTodo, toggleTodo, deleteTodo } from "../firebase";
import showToast from "../components/custom-toast";

export interface Todo {
  id: string;
  text: string;
  completedAt: Date | null;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
  todosCount: number;
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  todosCount: 0,
  loading: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
      state.todosCount = action.payload.length;
      state.loading = false;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
      state.todosCount += 1;
    },
    toggleTodoStatus(state, action: PayloadAction<{ id: string; completedAt: Date | null }>) {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.completedAt = action.payload.completedAt;
      }
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      state.todosCount = state.todos.length;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setTodos, addTodo, toggleTodoStatus, removeTodo, setLoading } = todoSlice.actions;
export default todoSlice.reducer;

// ---------------------------------- Firebase functions ----------------------------------
export const fetchAllTodos = (): ReducerThunk => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const todos = await getTodos();
    dispatch(setTodos(todos));
  } catch (error) {
    console.error(error)
    showToast("errorWhileFetchingTodoList")
  }
};

export const createNewTodo = (text: string): ReducerThunk => async (dispatch: Dispatch) => {
  try {
    const newTodo = await createTodo(text);
    dispatch(addTodo(newTodo));
    showToast("taskAdded")
  } catch (error) {
    console.error(error)
    showToast("errorWhileAddingTask")
  }
};

export const toggleTodoCompletion = (id: string, completedAt: Date | null): ReducerThunk => async (dispatch: Dispatch) => {
  try {
    await toggleTodo(id, completedAt);
    dispatch(toggleTodoStatus({ id, completedAt }));
    if (completedAt) showToast("taskCompleted")
  } catch (error) {
    console.error(error)
    showToast("errorWhileCompletingTask")
  }
};

export const deleteTodoById = (id: string): ReducerThunk => async (dispatch: Dispatch) => {
  try {
    await deleteTodo(id);
    dispatch(removeTodo(id));
    showToast('taskDeleted')
  } catch (error) {
    console.error(error)
    showToast("errorWhileDeletingTask")
  }
};
