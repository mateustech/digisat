import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Board from "./pages/Board";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/board" component={Board} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
