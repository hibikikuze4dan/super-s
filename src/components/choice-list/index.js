import {
  Grid,
  GridList,
  GridListTile,
  isWidthUp,
  withWidth,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrentSection } from "../../app/dataSlice";
import BasicCard from "../choice-card/BasicCard";

const ChoiceList = ({ width }) => {
  const { title, cols, choices } = useSelector(getCurrentSection);

  return (
    <Grid container>
      <GridList
        cellHeight="auto"
        cols={isWidthUp("sm", width) ? cols : 1}
        spacing={32}
      >
        {choices?.map((choice, index) => {
          return (
            <GridListTile key={`choice-${title}-${index}`}>
              <BasicCard {...choice} />
            </GridListTile>
          );
        })}
      </GridList>
    </Grid>
  );
};

export default withWidth()(ChoiceList);
