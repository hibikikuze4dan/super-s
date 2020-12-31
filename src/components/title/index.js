import { Grid, Typography } from "@material-ui/core";
import React from "react";

const Title = ({ text, isChoice }) => {
  return (
    <Grid container justify="center">
      <Typography
        variant={isChoice ? "h4" : "h2"}
        style={{
          textTransform: "uppercase",
          color: "white",
          fontSize: isChoice ? "2.125rem" : "3rem",
        }}
      >
        {text}
      </Typography>
    </Grid>
  );
};

Title.defaultProps = {
  text: "",
  isChoice: false,
};

export default Title;
