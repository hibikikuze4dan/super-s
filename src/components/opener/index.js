import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrentSection } from "../../app/dataSlice";
import Title from "../title";
import Description from "../description";

const Opener = ({ isCloser }) => {
  const { title, description, ...others } = useSelector(getCurrentSection);
  const noShow = isCloser && !others?.closer;
  return noShow ? null : (
    <Grid container spacing={4} style={{ backgroundColor: "#bb001cff" }}>
      {!isCloser && (
        <Grid item xs={12}>
          <Title text={title} />
        </Grid>
      )}
      <Grid item xs={12}>
        <Description text={isCloser ? others?.closer || [] : description} />
      </Grid>
    </Grid>
  );
};

export default Opener;
