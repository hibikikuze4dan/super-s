import { Button, Card, Grid, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import Description from "../description";
import Title from "../title";
import { lossOrGain } from "../../utils";
import { map } from "lodash";
import PointHandler from "./PointHandler";
import ExcludeHandler from "./ExcludeHandler";
import RequirementInterweave from "./RequirementInterweave";

const CardStructure = ({
  title,
  description,
  points,
  handleClick,
  isDrawback,
  picked,
  disabled,
  exclude,
  required,
  customRequirementText,
  ...otherProps
}) => {
  const normalColor = isDrawback ? "#292929ff" : "black";

  console.log(customRequirementText);
  return (
    <Card style={{ backgroundColor: !picked ? normalColor : "green" }}>
      <Button onClick={handleClick} disabled={disabled}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Title text={title} isChoice />
          </Grid>
          {customRequirementText && (
            <Grid item xs={12}>
              <RequirementInterweave text={customRequirementText} />
            </Grid>
          )}
          {(exclude?.length !== 0 || required?.length !== 0) &&
            (exclude?.length || required?.length) &&
            !customRequirementText && (
              <Grid item xs={12}>
                <ExcludeHandler excludes={exclude} requires={required} />
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
