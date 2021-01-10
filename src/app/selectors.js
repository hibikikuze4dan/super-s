import { reduce, sum, flatMap, map } from "lodash";
import { createSelector } from "@reduxjs/toolkit";

import { getLocation } from "./navigationSlice";

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

export const getBreastSize = (state) => state.choices.breast_size;

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
    const choicesExcludingDrawbacksIDs = choicesExcludingDrawbacks.map(
      (choice) => choice.id
    );
    console.log(choicesExcludingDrawbacksIDs, choicesExcludingDrawbacks);
    return sum(
      drawbacks.map((drawback) => {
        const isConnectedChoicesIDsArray = Array.isArray(
          drawback.connectedChoiceIDs
        );
        const giveExtraPoints = isConnectedChoicesIDsArray
          ? drawback.connectedChoiceIDs.some((connectedChoice) =>
              choicesExcludingDrawbacksIDs.includes(connectedChoice)
            )
          : choicesExcludingDrawbacksIDs.includes(drawback.connectedChoiceIDs);
        if (giveExtraPoints) {
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
