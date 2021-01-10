import { Divider, Grid } from "@material-ui/core";
import { find } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAppearance,
  setBodyFigure,
  setBodySize,
  setBreastSize,
  setGender,
  setHairColor,
  updateDrawbacks,
} from "../../app/choicesSlice";
import {
  getChoicesExcludingSectionSpecificAsFlatArray,
  getCurrentLocationsChoicesAsArray,
  getDrawbacks,
} from "../../app/selectors";
import { getLocation } from "../../app/navigationSlice";
import { getTitles, checkIfDisabled } from "../../utils";

import CardStructure from "./CardStructure";

const actionsByLocation = {
  gender: setGender,
  appearance: setAppearance,
  hair_color: setHairColor,
  body_figure: setBodyFigure,
  body_size: setBodySize,
  breast_size: setBreastSize,
};

const BasicCard = ({ title, id, ...otherProps }) => {
  const dispatch = useDispatch();
  const drawback = useSelector((state) => {
    console.log(state);
    return find(state.data.drawbacks, (drawback) =>
      drawback?.connectedChoiceIDs.includes(id)
    );
  });
  const currentDrawbacks = useSelector(getDrawbacks);
  const location = useSelector(getLocation);
  const currentLocationChoices = useSelector(getCurrentLocationsChoicesAsArray);
  const allChoices = useSelector(getChoicesExcludingSectionSpecificAsFlatArray);
  const isDisabled = checkIfDisabled(drawback, allChoices);

  return (
    <Grid container spacing={1} style={{ backgroundColor: "black" }}>
      <Grid item xs={12}>
        <CardStructure
          title={title}
          handleClick={() =>
            dispatch(actionsByLocation[location]({ title, id, ...otherProps }))
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
          picked={getTitles(currentDrawbacks).includes(drawback?.title)}
          disabled={isDisabled}
          {...drawback}
        />
      </Grid>
    </Grid>
  );
};

export default BasicCard;
