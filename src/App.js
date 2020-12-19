import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
        <Route path="/opening">
            Hello
          </Route>
          <Route path="/green">
            Grred
          </Route>
          <Route path="/" render={() => <Redirect to="/opening" />} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
