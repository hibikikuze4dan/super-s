import { AppBar, Grid } from "@material-ui/core";
import React from "react";
import NavDrawerButton from "./NavDrawerButton";

const NaviationBar = () => {
  return (
    <AppBar position="fixed">
      <Grid container justify="space-between">
        <Grid item>
          <NavDrawerButton />
        </Grid>
        <Grid item>
          <Grid container></Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default NaviationBar;
