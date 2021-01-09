import { Divider, Grid } from "@material-ui/core";
import { find } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChoicesExcludingSectionSpecificAsFlatArray,
  getCurrentLocationsChoicesAsArray,
  getDrawbacks,
  setAppearance,
  setBodyFigure,
  setGender,
  setHairColor,
  updateDrawbacks,
} from "../../app/choicesSlice";
import { getLocation } from "../../app/navigationSlice";
import { getTitles } from "../../utils";

import CardStructure from "./CardStructure";

const actionsByLocation = {
  gender: setGender,
  appearance: setAppearance,
  hair_color: setHairColor,
  body_figure: setBodyFigure,
};

const checkIfDisabled = (drawback, currentChoices) => {
  console.log(drawback, currentChoices);
  if (
    drawback?.exclude?.length === 0 ||
    drawback?.exclude?.length === undefined
  ) {
    return false;
  }
  const currentChoicesTitles = currentChoices.map((choice) => choice.title);
  console.log(currentChoicesTitles);
  return drawback.exclude.some((ex) => currentChoicesTitles.includes(ex));
};

const BasicCard = ({ title, ...otherProps }) => {
  const dispatch = useDispatch();
  const drawback = useSelector((state) =>
    find(state.data.drawbacks, { connectedChoice: title })
  );
  const currentDrawbacks = useSelector(getDrawbacks);
  const location = useSelector(getLocation);
  const currentLocationChoices = useSelector(getCurrentLocationsChoicesAsArray);
  const allChoices = useSelector(getChoicesExcludingSectionSpecificAsFlatArray);
  const isDisabled = checkIfDisabled(drawback, allChoices);
  console.log(isDisabled);

  return (
    <Grid container spacing={1} style={{ backgroundColor: "black" }}>
      <Grid item xs={12}>
        <CardStructure
          title={title}
          handleClick={() =>
            dispatch(actionsByLocation[location]({ title, ...otherProps }))
          }
          picked={getTitles(currentLocationChoices).includes(title)}
          {...otherProps}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <Divider />
      </Grid> */}
      <Grid item xs={12}>
        <CardStructure
          handleClick={() => dispatch(updateDrawbacks(drawback))}
          isDrawback
          picked={getTitles(currentDrawbacks).includes(drawback.title)}
          disabled={isDisabled}
          {...drawback}
        />
      </Grid>
    </Grid>
  );
};

export default BasicCard;
