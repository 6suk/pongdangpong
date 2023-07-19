import { AnyAction, Middleware, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import counterReducer from 'stores/counterSlice';

const middlewares: Middleware<AnyAction>[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: [...middlewares],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
