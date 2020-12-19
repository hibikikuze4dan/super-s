import { createSelector, createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";

export const choicesSlice = createSlice({
  name: "choices",
  initialState: {
    sectionSpecific: {
      genderChange: true,
    },
  },
  reducers: {
    updateGenderChange: (state, action) => {
      state.sectionSpecific = {
        ...state.sectionSpecific,
        genderChange: action.payload,
      };
    },
  },
});

export const { updateGenderChange } = choicesSlice.actions;

export const getSectionSpecific = (state) => state.choices.sectionSpecific;

export const getGenderChange = createSelector(
  getSectionSpecific,
  (sectionSpecific) => {
    return sectionSpecific.genderChange;
  }
);

export default choicesSlice.reducer;
