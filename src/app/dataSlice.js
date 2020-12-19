import { createSelector, createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";
import { cyoaData } from "../data";
import { getLocation } from "./navigationSlice";

export const dataSlice = createSlice({
  name: "data",
  initialState: cyoaData,
  reducers: {},
});

export const getSections = (state) => state.data.sections;

export const getCurrentSection = createSelector(
  getLocation,
  getSections,
  (location, sections) => {
    return sections[location];
  }
);

export default dataSlice.reducer;
