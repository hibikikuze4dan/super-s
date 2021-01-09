import { Button, Card, Grid, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import Description from "../description";
import Title from "../title";
import { lossOrGain } from "../../utils";
import { map } from "lodash";
import PointHandler from "./PointHandler";
import ExcludeHandler from "./ExcludeHandler";

const CardStructure = ({
  title,
  description,
  points,
  handleClick,
  isDrawback,
  picked,
  disabled,
  exclude,
  ...otherProps
}) => {
  const normalColor = isDrawback ? "#292929ff" : "black";

  return (
    <Card style={{ backgroundColor: !picked ? normalColor : "green" }}>
      <Button onClick={handleClick} disabled={disabled}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text={title} isChoice />
          </Grid>
          {exclude.length !== 0 && (
            <Grid item xs={12}>
              <ExcludeHandler excludes={exclude} />
            </Grid>
          )}
          <Grid item xs={12}>
            <PointHandler points={points} />
          </Grid>
          <Grid item xs={12}>
            <Description text={description} isChoice />
          </Grid>
        </Grid>
      </Button>
    </Card>
  );
};

CardStructure.defaultProps = {
  exclude: [],
  disabled: false,
};

export default CardStructure;
