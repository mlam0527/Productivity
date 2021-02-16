import React, { Component } from "react";
import OauthLoginForm from "./oauth-login-form";
import ToDo from "./ToDo";
import GoogleCal from "./GoogleCal";

const Root = () => {
  return (
    <div>
      <OauthLoginForm />
      <ToDo />
      {/* <Pomodoro /> */}
      {/* <GoogleCal /> */}
      {/* <Spotify /> */}
    </div>
  );
};

export default Root;
