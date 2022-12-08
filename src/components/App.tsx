import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./../../node_modules/office-ui-fabric-react/dist/css/fabric.min.css";
import "./App.scss";
import AppLayout from "./AppLayout";
import SingleData from "./SingleData";

export default function App() {
 
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} >
          <AppLayout/>
        </Route>
        <Route path="/:id" exact={true}>
          <SingleData/>
        </Route>
        <Route path="*">
          <AppLayout />
        </Route>
      </Switch>
    </Router>
  );
}
