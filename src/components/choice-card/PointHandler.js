import { Typography } from "@material-ui/core";
import { map } from "lodash";
import React, { Fragment } from "react";
import { lossOrGain } from "../../utils";

const PointHandler = ({ points }) => {
  return (
    <Typography style={{ color: "white" }}>
      {map(points, (pointsOfType, pointType) => {
        return (
          <Fragment key={`${pointType}-fragment`}>
            {pointsOfType >= 0 ? "Gain: " : "Cost: "}
            <span style={{ color: "blue" }}>{lossOrGain(pointsOfType)}</span>
          </Fragment>
        );
      })}
    </Typography>
  );
};

export default PointHandler;
