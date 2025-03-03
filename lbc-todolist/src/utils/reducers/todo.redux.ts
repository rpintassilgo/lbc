import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { ReducerThunk } from ".";
import { getTodos, createTodo, toggleTodo, deleteTodo } from "../firebase"; // Firestore functions

export interface Todo {
  id: string; // Firestore uses string IDs
  text: string;
  completedAt: Date | null; // If completed, store date; if not, keep null
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

// 🟢 Fetch todos from Firestore
export const fetchAllTodos = (): ReducerThunk => async (dispatch: Dispatch) => {
  dispatch(setLoading(true));
  try {
    const todos = await getTodos();
    dispatch(setTodos(todos));
  } catch (error) {
    console.error("Failed to load todos:", error);
  }
};

// 🟢 Add a new todo and save it to Firestore
export const createNewTodo = (text: string): ReducerThunk => async (dispatch: Dispatch) => {
  try {
    const newTodo = await createTodo(text);
    dispatch(addTodo(newTodo));
  } catch (error) {
    console.error("Failed to save new todo:", error);
  }
};

// 🟢 Toggle completion status and update Firestore
export const toggleTodoCompletion = (id: string, completedAt: Date | null): ReducerThunk => async (dispatch: Dispatch) => {
  try {
    await toggleTodo(id, completedAt);
    dispatch(toggleTodoStatus({ id, completedAt }));
  } catch (error) {
    console.error("Failed to update todo status:", error);
  }
};

// 🟢 Remove a todo from Firestore
export const deleteTodoById = (id: string): ReducerThunk => async (dispatch: Dispatch) => {
  try {
    await deleteTodo(id);
    dispatch(removeTodo(id));
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};
