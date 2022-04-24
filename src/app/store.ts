import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filterReducer from '../features/filter/filterSlice';
import usersReducer from '../features/users/usersSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    users: usersReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
