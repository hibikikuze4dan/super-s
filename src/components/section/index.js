import { Grid } from "@material-ui/core";
import React from "react";
import Opener from "../opener";
import SectionSpecificComponentHandler from "./SectionSpecificComponentHandler";

const Section = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Opener />
      </Grid>
      <Grid item xs={12}>
        <SectionSpecificComponentHandler />
      </Grid>
    </Grid>
  );
};

export default Section;
