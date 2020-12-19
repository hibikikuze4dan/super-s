import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrentSection } from "../../app/dataSlice";
import { getLocation } from "../../app/navigationSlice";
import { GenderChange } from "./section-specific-components/GenderChange";

const SectionSpecificComponentHandler = () => {
  const currentSection = useSelector(getLocation);
  const sectionComponents = {
    gender: <GenderChange />,
  };
  return (
    <Grid container justify="center">
      {sectionComponents[currentSection] || null}
    </Grid>
  );
};

export default SectionSpecificComponentHandler;
