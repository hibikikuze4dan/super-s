import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrentSection } from "../../app/dataSlice";
import Title from "../title";
import Description from "../description";

const Opener = () => {
  const { title, description } = useSelector(getCurrentSection);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Title text={title} />
      </Grid>
      <Grid item xs={12}>
        <Description text={description} />
      </Grid>
    </Grid>
  );
};

export default Opener;
