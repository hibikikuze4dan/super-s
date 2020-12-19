import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenderChange, updateGenderChange } from "../../../app/choicesSlice";

export const GenderChange = () => {
  const dispatch = useDispatch();
  const changingGender = useSelector(getGenderChange);

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Are you changing your gender?</FormLabel>
        <FormGroup
          aria-label="gender"
          name="gender1"
          value={changingGender}
          row
          onChange={() => dispatch(updateGenderChange(!changingGender))}
          style={{ justifyContent: "center" }}
        >
          <FormControlLabel
            control={
              <Checkbox value={changingGender} checked={changingGender} />
            }
            label={changingGender ? "Yes" : "No"}
          />
        </FormGroup>
      </FormControl>
    </>
  );
};
