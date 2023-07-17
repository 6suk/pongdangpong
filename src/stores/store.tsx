import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

export default configureStore({
  reducer: {},
  middleware:
    process.env.NODE_ENV === 'development'
      ? (getDefaultMiddleware:any) =>
          getDefaultMiddleware({
            serializableCheck: false,
          }).concat(logger)
      : (getDefaultMiddleware:any) =>
          getDefaultMiddleware({
            serializableCheck: false,
          }).concat(),
  devTools: process.env.NODE_ENV === 'development',
});