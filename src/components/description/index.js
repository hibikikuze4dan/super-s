import { Grid, Typography } from "@material-ui/core";
import Interweave from "interweave";
import React from "react";

const Description = ({ text }) => {
  return (
    <Grid container justify="center">
      <Typography>
        {text.map((str, ind) => {
          return (
            <>
              <Interweave key={`interweave-desc-${ind}`} content={str} />
              {text.length - 1 !== ind && (
                <>
                  <br />
                  <br />
                </>
              )}
            </>
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
