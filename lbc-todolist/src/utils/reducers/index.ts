import todoReducer from './todo.redux'

import { configureStore, ThunkAction } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    todoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type ReducerState = ReturnType<typeof store.getState>;

export type ReducerDispatch = typeof store.dispatch;

export type ReducerThunk<R = any> = ThunkAction<R, ReducerState, never, any>;

export default store;
