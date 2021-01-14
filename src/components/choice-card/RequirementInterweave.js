import { Grid, Typography } from "@material-ui/core";
import Interweave, { Matcher } from "interweave";
import React from "react";

export class RequirementMatcher extends Matcher {
  match(str) {
    const result = str.match(/Penis Vagina|Always Hard|Vagina/);

    if (!result) {
      return null;
    }

    return {
      index: result.index,
      length: result[0].length,
      match: result[0],
      valid: true,
    };
  }

  replaceWith(children, props) {
    return (
      <span className="Interweave-Red" {...props}>
        {children}
      </span>
    );
  }

  asTag() {
    return "span";
  }
}

const RequirementInterweave = ({ text }) => {
  return (
    <Grid container justify="center">
      <Typography style={{ color: "white" }}>
        {text.map((textSnippet, index) => {
          return (
            <Interweave
              key={`${index}-interweave-for-card`}
              content={textSnippet}
              matchers={[new RequirementMatcher("span")]}
            />
          );
        })}
      </Typography>
    </Grid>
  );
};

export default RequirementInterweave;
