import { createSelector, createSlice } from "@reduxjs/toolkit";
import { reduce, last, sum, flatMap, map } from "lodash";
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
    appearance: {
      points: {
        power: 0,
      },
    },
    hair_color: {
      points: {
        power: 0,
      },
    },
    body_figure: {
      points: {
        power: 0,
      },
    },
    body_size: {
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
    setAppearance: (state, action) => {
      state.appearance = action.payload;
    },
    setHairColor: (state, action) => {
      state.hair_color = action.payload;
    },
    setBodyFigure: (state, action) => {
      state.body_figure = action.payload;
    },
    setBodySize: (state, action) => {
      state.body_size = action.payload;
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
  setAppearance,
  setHairColor,
  setBodyFigure,
  setBodySize,
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

export const getChoicesExcludingSectionSpecific = createSelector(
  getChoices,
  (choices) => {
    const filters = ["sectionSpecific"];
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

export const getChoicesExcludingSpecialSections = createSelector(
  getChoices,
  (choices) => {
    const filters = ["drawbacks", "sectionSpecific", "gender"];
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

export const getChoicesExcludingSectionSpecificAsFlatArray = createSelector(
  getChoicesExcludingSectionSpecific,
  (choices) => {
    return flatMap(choices, (choiceSection) => {
      return Array.isArray(choiceSection) ? choiceSection : [choiceSection];
    });
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

export const getChoicesExcludingSpecialSectionsAsFlatArray = createSelector(
  getChoicesExcludingSpecialSections,
  (choices) => {
    return flatMap(choices, (choiceSection) => {
      return Array.isArray(choiceSection) ? choiceSection : [choiceSection];
    });
  }
);

export const getGender = (state) => state.choices.gender;

export const getAppearance = (state) => state.choices.appearance;

export const getHairColor = (state) => state.choices.hair_color;

export const getBodyFigure = (state) => state.choices.body_figure;

export const getBodySize = (state) => state.choices.body_size;

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
          choicesExcludingDrawbacksTitles.includes(drawback.connectedChoices) ||
          drawback.connectedChoices.some((connectedChoice) =>
            choicesExcludingDrawbacksTitles.includes(connectedChoice)
          )
        ) {
          return drawback.points.power + 3;
        }
        return drawback.points.power;
      })
    );
  }
);

const getPointsFromChoice = (choice) => {
  return choice.points;
};

const getPowerPointsForBasicSections = createSelector(
  getChoicesExcludingSpecialSectionsAsFlatArray,
  (choices) => {
    return sum(map(choices, (choice) => getPointsFromChoice(choice).power));
  }
);

const compilePoints = createSelector(
  genderPointsHandler,
  drawbacksPointHandler,
  getPowerPointsForBasicSections,
  (genderPoints, drawbackPoints, basicSectionsPoints) => {
    return {
      power: sum([0, genderPoints, drawbackPoints, basicSectionsPoints]),
    };
  }
);

export const getCompiledPoints = createSelector(
  compilePoints,
  (points) => points
);

export default choicesSlice.reducer;
