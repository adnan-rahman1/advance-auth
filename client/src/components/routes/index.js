import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home";
import SignUp from "../signup";
import SignIn from "../signin";
import SignOut from "../signout";
import ActivateAccount from "../activate-account";

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/home" component={() => <Home />} />
      {props.isAuth || (
        <Fragment>
          <Route path="/signup" component={SignUp} />
          <Route
            path="/signin"
            component={() => <SignIn isAuthenticated={props.isAuthenticated} />}
          />
        </Fragment>
      )}
      <Route
        path="/signout"
        component={() => <SignOut isAuthenticated={props.isAuthenticated} />}
      />
      <Route
        exact
        path="/activate-account/:token"
        component={ActivateAccount}
      />
    </Switch>
  );
};

export default Routes;
