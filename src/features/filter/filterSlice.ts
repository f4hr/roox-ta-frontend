import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';

export type FilterState = {
  field: string;
  status: 'disabled' | 'enabled';
};

const initialState: FilterState = {
  field: '',
  status: 'disabled',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<string>) => {
      state.field = action.payload;
    },
    setStatus: (state, action: PayloadAction<FilterState['status']>) => {
      state.status = action.payload;
    },
  },
});

const selectSelf = (state: RootState) => state.filter;

export const { setField, setStatus } = filterSlice.actions;

export const fieldSelector = createDraftSafeSelector(selectSelf, (state) => state.field);
export const statusSelector = createDraftSafeSelector(selectSelf, (state) => state.status);

export default filterSlice.reducer;
