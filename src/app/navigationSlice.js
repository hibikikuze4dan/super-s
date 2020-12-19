import { createSlice } from '@reduxjs/toolkit';
import { last } from 'lodash';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    location: last(window.location.href.split('/')),
  },
  reducers: {
    updateLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { updateLocation } = navigationSlice.actions;

export const getLocation = state => state.location;

export default navigationSlice.reducer;
