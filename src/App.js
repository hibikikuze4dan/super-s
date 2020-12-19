import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Opener from "./components/opener";
import SectionRoutes from "./components/section-routes";
import NaviationBar from "./components/navigation-bar";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <NaviationBar />
        <Switch>
          <SectionRoutes />
          <Route path="/green">Grred</Route>
          <Route path="/" render={() => <Redirect to="/opening" />} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
