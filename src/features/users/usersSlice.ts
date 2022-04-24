import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import type { User } from '../../types/types';
import { loadingStates, getUsers } from '../../api';

type ThunkErrorType = {
  rejectValue: {
    message: string;
  };
};

const usersAdapter = createEntityAdapter<User>();

export const fetchUsers = createAsyncThunk<User[], null, ThunkErrorType>(
  'users/fetchUsers',
  async (d, { rejectWithValue }) => {
    try {
      const response = await getUsers<User[]>();
      return response;
    } catch (err) {
      return rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  status: loadingStates.idle,
  error: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const users = action.payload;

        usersAdapter.setAll(state, users);

        state.status = loadingStates.succeeded;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = { message: action.payload.message };

        state.status = loadingStates.failed;
      });
  },
});

export const usersSelectors = usersAdapter.getSelectors<RootState>((state) => state.users);
export const selectUserForForm = (state: RootState, userId: User['id']) => {
  const user = usersSelectors.selectById(state, userId);

  if (!user) return null;

  return {
    name: user.name,
    username: user.username,
    email: user.email,
    street: user.address.street,
    city: user.address.city,
    zipcode: user.address.zipcode,
    phone: user.phone,
    website: user.website,
  };
};

export default usersSlice.reducer;
