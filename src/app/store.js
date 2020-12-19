import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import navigationReducer from "./navigationSlice";
import dataReducer from "./dataSlice";
import choicesReduces from "./choicesSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    navigation: navigationReducer,
    data: dataReducer,
    choices: choicesReduces,
  },
});
