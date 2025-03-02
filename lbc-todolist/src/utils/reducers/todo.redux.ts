import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoState {
  todos: Todo[];
  todosCount: number;
}

const initialState: TodoState = {
  todos: [],
  todosCount: 0,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.todosCount += 1;
      state.todos.push({
        id: state.todosCount,
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      });
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    clearTodos(state) {
      state.todos = [];
      state.todosCount = 0;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, clearTodos } = todoSlice.actions;

export default todoSlice.reducer;