import { createSelector, createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";
import { getLocation } from "./navigationSlice";

export const choicesSlice = createSlice({
  name: "choices",
  initialState: {
    sectionSpecific: {
      genderChange: true,
    },
    gender: {},
    drawbacks: [],
  },
  reducers: {
    updateGenderChange: (state, action) => {
      state.sectionSpecific = {
        ...state.sectionSpecific,
        genderChange: action.payload,
      };
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    updateDrawbacks: (state, action) => {
      const titles = state.drawbacks.map((drawback) => drawback.title);
      if (titles.includes(action.payload.title)) {
        state.drawbacks = [
          ...state.drawbacks.filter(
            (drawback) => drawback.title !== action.payload.title
          ),
        ];
      } else {
        state.drawbacks = [...state.drawbacks, action.payload];
      }
    },
  },
});

export const {
  updateGenderChange,
  setGender,
  updateDrawbacks,
} = choicesSlice.actions;

export const getSectionSpecific = (state) => state.choices.sectionSpecific;

export const getGenderChange = createSelector(
  getSectionSpecific,
  (sectionSpecific) => {
    return sectionSpecific.genderChange;
  }
);

export const getChoices = (state) => state.choices;

export const getGender = (state) => state.choices.gender;

export const getDrawbacks = (state) => state.choices.drawbacks;

export const getCurrentLocationsChoices = createSelector(
  getChoices,
  getLocation,
  (choices, location) => {
    return choices[location] || [];
  }
);

export const getCurrentLocationsChoicesAsArray = createSelector(
  getCurrentLocationsChoices,
  (currentChoices) => {
    return Array.isArray(currentChoices) ? currentChoices : [currentChoices];
  }
);

export default choicesSlice.reducer;
