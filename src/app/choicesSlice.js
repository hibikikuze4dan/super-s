import { createSelector, createSlice } from "@reduxjs/toolkit";

const updateDrawbbacksBasedOnExcludeAndRequire = (payload, state) => {
  return [
    ...state.drawbacks.filter((drawback) => {
      const exclude = drawback?.exclude || [];
      const require = drawback?.required || [];
      if (exclude.length === 0) {
        return require.includes(payload.title);
      }
      return !exclude.includes(payload.title);
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
      state.drawbacks = updateDrawbbacksBasedOnExcludeAndRequire(
        action.payload,
        state
      );
    },
    setBodySize: (state, action) => {
      state.body_size = action.payload;
    },
    setBreastSize: (state, action) => {
      state.breast_size = action.payload;
      state.drawbacks = updateDrawbbacksBasedOnExcludeAndRequire(
        action.payload,
        state
      );
    },
    setButtSize: (state, action) => {
      state.butt_size = action.payload;
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
  updateDrawbacks,
} = choicesSlice.actions;

export default choicesSlice.reducer;
