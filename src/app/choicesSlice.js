import { createSelector, createSlice } from "@reduxjs/toolkit";
import { reduce, flatMap } from "lodash";

const getChoicesExcludingDrawbacksFlattened = (choices) => {
  const filters = ["drawbacks", "sectionSpecific"];
  const choicesExcludingDrawbacks = reduce(
    choices,
    (acc, choiceSection, key) => {
      if (!filters.includes(key)) {
        acc[key] = choiceSection;
      }
      return acc;
    },
    {}
  );
  return flatMap(choicesExcludingDrawbacks, (choiceSection) => {
    return Array.isArray(choiceSection) ? choiceSection : [choiceSection];
  });
};

const updateDrawbbacksBasedOnExcludeAndRequire = (state) => {
  const choicesExcludingDrawbacks = getChoicesExcludingDrawbacksFlattened(
    state
  ).map((choice) => choice.title);
  console.log(state);
  return [
    ...state.drawbacks.filter((drawback) => {
      const exclude = drawback?.exclude || [];
      const require = drawback?.required || [];
      if (require.length === 0 && exclude.length === 0) {
        return true;
      } else if (exclude.length === 0) {
        return require.some((requirement) =>
          choicesExcludingDrawbacks.includes(requirement)
        );
      } else if (require.length === 0) {
        return !exclude.some((excludement) =>
          choicesExcludingDrawbacks.includes(excludement)
        );
      }
      return (
        !require.some((requirement) =>
          choicesExcludingDrawbacks.includes(requirement)
        ) &&
        exclude.some((excludement) =>
          choicesExcludingDrawbacks.includes(excludement)
        )
      );
    }),
  ];
};

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
    breast_size: {
      points: {
        power: 0,
      },
    },
    butt_size: {
      points: {
        power: 0,
      },
    },
    genitals: [],
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
      state.drawbacks = updateDrawbbacksBasedOnExcludeAndRequire(state);
    },
    setBodySize: (state, action) => {
      state.body_size = action.payload;
      state.drawbacks = updateDrawbbacksBasedOnExcludeAndRequire(state);
    },
    setBreastSize: (state, action) => {
      state.breast_size = action.payload;
      state.drawbacks = updateDrawbbacksBasedOnExcludeAndRequire(state);
    },
    setButtSize: (state, action) => {
      state.butt_size = action.payload;
      state.drawbacks = updateDrawbbacksBasedOnExcludeAndRequire(state);
    },
    updateGenitals: (state, action) => {
      const entryExists = state.genitals.some(
        (genitalEntry) => genitalEntry.title === action.payload.title
      );
      const hasPenisVagina = state.drawbacks.some(
        (drawback) => drawback.title === "Penis Vagina"
      );
      if (entryExists) {
        state.genitals = [
          ...state.genitals.filter(
            (genitalEntry) => genitalEntry.title !== action.payload.title
          ),
        ];
      } else if (hasPenisVagina) {
        state.genitals = [action.payload, ...state.genitals];
      } else {
        state.genitals = [action.payload];
      }
      state.drawbacks = updateDrawbbacksBasedOnExcludeAndRequire(state);
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
  setBreastSize,
  setButtSize,
  updateGenitals,
  updateDrawbacks,
} = choicesSlice.actions;

export default choicesSlice.reducer;
