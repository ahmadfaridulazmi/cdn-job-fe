import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ListFreelancers from "./pages/freelancers/list/list";
import NewFreelancers from "./pages/freelancers/new/new";
import EditFreelancers from "./pages/freelancers/edit/edit";


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <ListFreelancers />
        </Route>
        <Route exact path='/users/new'>
          <NewFreelancers />
        </Route>
        <Route exact path='/users/:id/edit'>
          <EditFreelancers />
        </Route>
      </Switch>
    </Router>
  )
}
export default Routes;
