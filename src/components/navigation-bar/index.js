import { AppBar, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getCompiledPoints } from "../../app/choicesSlice";
import NavDrawerButton from "./NavDrawerButton";

const NaviationBar = () => {
  const points = useSelector(getCompiledPoints);

  return (
    <AppBar position="fixed">
      <Grid container justify="space-between">
        <Grid item>
          <NavDrawerButton />
        </Grid>
        <Grid item>
          <Grid
            container
            alignContent="center"
            style={{ height: "100%", paddingRight: "16px" }}
          >
            <Typography>{points.power}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default NaviationBar;
