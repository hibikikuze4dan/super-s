import { Divider, Grid } from "@material-ui/core";
import { find } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentLocationsChoicesAsArray,
  getDrawbacks,
  setGender,
  updateDrawbacks,
} from "../../app/choicesSlice";
import { getLocation } from "../../app/navigationSlice";
import { getTitles } from "../../utils";

import CardStructure from "./CardStructure";

const actionsByLocation = {
  gender: setGender,
};

const BasicCard = ({ title, ...otherProps }) => {
  const dispatch = useDispatch();
  const drawback = useSelector((state) =>
    find(state.data.drawbacks, { connectedChoice: title })
  );
  const currentDrawbacks = useSelector(getDrawbacks);
  const location = useSelector(getLocation);
  const currentChoices = useSelector(getCurrentLocationsChoicesAsArray);

  return (
    <Grid container spacing={1} style={{ backgroundColor: "black" }}>
      <Grid item xs={12}>
        <CardStructure
          title={title}
          handleClick={() =>
            dispatch(actionsByLocation[location]({ title, ...otherProps }))
          }
          picked={getTitles(currentChoices).includes(title)}
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
          {...drawback}
        />
      </Grid>
    </Grid>
  );
};

export default BasicCard;
