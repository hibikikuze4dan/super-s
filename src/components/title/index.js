import { Grid, Typography } from "@material-ui/core";
import React from "react";

const Title = ({ text }) => {
  return (
    <Grid container justify="center">
      <Typography>{text}</Typography>
    </Grid>
  );
};

Title.defaultProps = {
  text: "",
};

export default Title;
