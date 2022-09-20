import React, { useState } from "react";
import AnonymousLogin from "../anonymous-login/anonymousLogin";
import ForgotPassword from "../forgot-password/forgotPassword";
import Login from "../login/login";
import MessageBox from "../messageBox/messageBox";
import Register from "../register/register";
import "./UI.css";
import LinearProgress from "@mui/material/LinearProgress";
import { useMediaQuery } from "@mui/material";
import { screenSizes } from "../../../util/helper";
function UI() {
  const [page, setPage] = useState("login");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const xs = useMediaQuery(screenSizes.xs);

  const getUI = () => {
    let tempPage = page;
    let tempUrl = window.location.href.split("?");
    if (tempUrl.length > 1) {
      const url = new URLSearchParams(tempUrl[1]);
      tempPage = url.get("page") ?? "login";
      //console.log("url", url);
    }
    //console.log("page", tempPage, "tempUrl", tempUrl);
    switch (tempPage) {
      case "register":
        return (
          <Register
            setLoader={setLoader}
            setError={setError}
            setPage={setPage}
          />
        );
      case "login":
        return (
          <Login setPage={setPage} setError={setError} setLoader={setLoader} />
        );
      case "forgot":
        return (
          <ForgotPassword
            setPage={setPage}
            setError={setError}
            setLoader={setLoader}
          />
        );
      case "anonymous":
        return (
          <AnonymousLogin
            setPage={setPage}
            setError={setError}
            setLoader={setLoader}
          />
        );
      default:
        return (
          <p style={{ zIndex: 1 }}>
            The requested page not found. Sorry for the inconvenience.
          </p>
        );
    }
  };
  return (
    <div className="main__auth">
      {loader && (
        <LinearProgress
          color="primary"
          style={{ zIndex: 1, margin: -23, marginTop: -24 }}
        />
      )}
      <div className="container__auth a-container__auth" id="a-container">
        {!xs && <div className="switch__circle__auth"></div>}
        {!xs && (
          <div className="switch__circle__auth switch__circle--t__auth"></div>
        )}
        {getUI()}
        {error && (
          <MessageBox
            title={"Error"}
            message={error}
            actionName={"OK"}
            openDialog={!!error}
            actionLinkMethod={() => setError("")}
          />
        )}
      </div>

      <div className="container__auth b-container__auth" id="b-container"></div>
    </div>
  );
}
export default UI;
