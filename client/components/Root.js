import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OauthLoginForm from "./oauth-login-form";
import ToDo from "./ToDo";
import GoogleCal from "./GoogleCal";

const Root = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/loggedIn'>
          {/* <GoogleCal /> */}
            <ToDo />
          {/* <Pomodoro /> */}
          {/* <Spotify /> */}
          </Route>
          <Route path="/">
            <OauthLoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Root;
