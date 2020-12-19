import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { getSectionKeys } from "../../app/dataSlice";
import Section from "../section";

const SectionRoutes = () => {
  const routePaths = useSelector(getSectionKeys);
  return (
    <>
      {routePaths.map((route, index) => {
        return (
          <Route path={`/${route}`} key={`section-route-${index}`}>
            <Section />
          </Route>
        );
      })}
    </>
  );
};

export default SectionRoutes;
