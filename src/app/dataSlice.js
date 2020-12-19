import { createSlice } from "@reduxjs/toolkit";
import { last } from "lodash";
import { cyoaData } from "../data";

export const dataSlice = createSlice({
  name: "data",
  initialState: cyoaData,
  reducers: {},
});

export const getSections = (state) => state.sections;

export default dataSlice.reducer;
