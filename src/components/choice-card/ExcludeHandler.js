import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";

const ExcludeHandler = ({ excludes, requires }) => {
  const theExcluded = excludes || [];
  const theRequired = requires || [];

  return theRequired.length !== 0 || theExcluded.length !== 0 ? (
    <Typography style={{ color: "white" }}>
      {"Requirement: "}
      {theExcluded.map((exclude, index) => {
        return (
          <Fragment key={`${exclude}-${index}`}>
            {index === theExcluded.length - 1 && index !== 0 && " and "}
            Not <span style={{ color: "red" }}>{exclude}</span>
            {![theExcluded.length - 1].includes(index) &&
              theExcluded.length > 2 &&
              ","}{" "}
          </Fragment>
        );
      })}
      {theRequired.map((requirement, index) => {
        return (
          <Fragment key={`${requirement}-${index}`}>
            {index === theRequired.length - 1 && " or "}
            <span style={{ color: "red" }}>{requirement}</span>
            {index !== theRequired.length - 1 && ", "}
          </Fragment>
        );
      })}
    </Typography>
  ) : null;
};

export default ExcludeHandler;
