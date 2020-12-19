import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSectionKeys } from "../../app/dataSlice";
import { updateLocation } from "../../app/navigationSlice";

const NavDrawerLinks = ({ handleSelect }) => {
  const dispatch = useDispatch();
  const links = useSelector(getSectionKeys);
  return (
    <Grid container>
      {links.map((link, ind) => {
        return (
          <Grid item xs={12} key={`navDrawerLinks-link-${ind}`}>
            <Button
              fullWidth
              onClick={() => {
                dispatch(updateLocation(link));
                handleSelect(false);
              }}
              component={Link}
              to={`/${link}`}
            >
              {link}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default NavDrawerLinks;
