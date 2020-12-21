import { createSelector, createSlice } from "@reduxjs/toolkit";
import { reduce, last, sum, flatMap } from "lodash";
import { getLocation } from "./navigationSlice";

export const choicesSlice = createSlice({
  name: "choices",
  initialState: {
    sectionSpecific: {
      genderChange: true,
    },
    gender: {
      points: {
        power: 0,
      },
    },
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

export const getChoicesExcludingDrawbacks = createSelector(
  getChoices,
  (choices) => {
    const filters = ["drawbacks", "sectionSpecific"];
    return reduce(
      choices,
      (acc, choiceSection, key) => {
        if (!filters.includes(key)) {
          acc[key] = choiceSection;
        }
        return acc;
      },
      {}
    );
  }
);

export const getChoicesExcludingDrawbacksAsFlatArray = createSelector(
  getChoicesExcludingDrawbacks,
  (choices) => {
    return flatMap(choices, (choiceSection) => {
      return Array.isArray(choiceSection) ? choiceSection : [choiceSection];
    });
  }
);

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

const genderPointsHandler = createSelector(
  getGender,
  getGenderChange,
  (gender, isChangingGender) => {
    if (isChangingGender && gender?.title) {
      return gender.points.power + 10;
    }
    return gender.points.power;
  }
);

const drawbacksPointHandler = createSelector(
  getDrawbacks,
  getChoicesExcludingDrawbacksAsFlatArray,
  (drawbacks, choicesExcludingDrawbacks) => {
    const choicesExcludingDrawbacksTitles = choicesExcludingDrawbacks.map(
      (choice) => choice.title
    );
    return sum(
      drawbacks.map((drawback) => {
        if (
          choicesExcludingDrawbacksTitles.includes(drawback.connectedChoice)
        ) {
          return drawback.points.power + 3;
        }
        return drawback.points.power;
      })
    );
  }
);

const compilePoints = (state) => {
  const points = {
    power: sum([0, genderPointsHandler(state), drawbacksPointHandler(state)]),
  };
  return points;
};

export const getCompiledPoints = createSelector(
  compilePoints,
  (points) => points
);

export default choicesSlice.reducer;
