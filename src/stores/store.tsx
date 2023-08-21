import { AnyAction, Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';

import { menuReducer } from '@stores/menuSlice';
import { calendarReducer } from '@stores/selectedDateSlice';
import { tokenReducer } from '@stores/tokenSilce';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import { findUsersReducer } from './findUsersSlice';

const middlewares: Middleware<AnyAction>[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const reducers = combineReducers({
  tokens: tokenReducer,
  menu: menuReducer,
  calendar: calendarReducer,
  findUsers: findUsersReducer,
});

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['tokens'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: [...middlewares],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
