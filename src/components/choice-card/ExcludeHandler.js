import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";

const ExcludeHandler = ({ excludes }) => {
  return (
    <Typography style={{ color: "white" }}>
      {"Requirement: "}
      {excludes.map((exclude, index) => {
        return (
          <Fragment key={`${exclude}-${index}`}>
            {index === excludes.length - 1 && " and "}
            Not <span style={{ color: "red" }}>{exclude}</span>
          </Fragment>
        );
      })}
    </Typography>
  );
};

export default ExcludeHandler;
