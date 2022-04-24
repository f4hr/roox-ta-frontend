import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
