import { createDraftSafeSelector, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export type ProfileStateType = {
  readonly: boolean;
};

const initialState: ProfileStateType = {
  readonly: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    enableReadonly: (state) => {
      state.readonly = true;
    },
    disableReadonly: (state) => {
      state.readonly = false;
    },
  },
});

const selectSelf = (state: RootState) => state.profile;

export const { enableReadonly, disableReadonly } = profileSlice.actions;

export const readonlySelector = createDraftSafeSelector(selectSelf, (state) => state.readonly);

export default profileSlice.reducer;
