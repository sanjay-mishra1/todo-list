import React, { Component } from "react";
import { getSession } from "../server/auth";
import UI from "./components/UI/UI";

export class AuthHome extends Component {
  state = {
    user: null,
  };
  setUser = (val) => {
    this.setState({ user: val });
  };
  render() {
    document.title = "SanjayApps Auth";
    if (!this.state.user) getSession(this.setUser, false);
    else {
      if (window.location.href.includes("auth")) window.location.href = "/";
    }
    //console.log("auth user", this.state.user);
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UI />
      </div>
    );
  }
}

export default AuthHome;
