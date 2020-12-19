import { Grid, Typography } from "@material-ui/core";
import Interweave from "interweave";
import React, { Fragment } from "react";
import { PowerPointsMatcher } from "./Matcher";

const Description = ({ text }) => {
  return (
    <Grid container justify="center">
      <Typography>
        {text.map((str, ind) => {
          return (
            <Fragment key={`interweave-desc-${ind}`}>
              <Interweave
                content={str}
                matchers={[new PowerPointsMatcher("PP")]}
              />
              {text.length - 1 !== ind && (
                <>
                  <br />
                  <br />
                </>
              )}
            </Fragment>
          );
        })}
      </Typography>
    </Grid>
  );
};

Description.defautProps = {
  text: [],
};

export default Description;
