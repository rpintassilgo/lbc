import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import todoReducer from './todo.redux';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// explicitly type state and dispatch
export type ReducerState = ReturnType<typeof store.getState>;
export type ReducerDispatch = ThunkDispatch<ReducerState, void, any>;
export type ReducerThunk<R = void> = ThunkAction<R, ReducerState, unknown, any>;

export default store;
