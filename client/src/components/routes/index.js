import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home";
import SignUp from "../signup";
import SignIn from "../signin";
import SignOut from "../signout";
import ActivateAccount from "../activate-account";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signout" component={SignOut} />
      <Route exact path="/activate-account/:token" component={ActivateAccount} />
    </Switch>
  )
}

export default Routes;