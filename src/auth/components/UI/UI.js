import React, { useState } from "react";
import AnonymousLogin from "../anonymous-login/anonymousLogin";
import ForgotPassword from "../forgot-password/forgotPassword";
import Login from "../login/login";
import MessageBox from "../messageBox/messageBox";
import Register from "../register/register";
import "./UI.css";
import LinearProgress from "@mui/material/LinearProgress";
import { useMediaQuery } from "@mui/material";
import { getDefaultAuthPage, screenSizes } from "../../../util/helper";
import { useLocation } from "react-router-dom";
function UI() {
  const [page, setPage] = useState(getDefaultAuthPage());
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const xs = useMediaQuery(screenSizes.xs);
  let location = useLocation();

  React.useEffect(() => {
    getUI();
  }, [location]);
  const getUI = () => {
    let tempPage = getDefaultAuthPage(page);

    switch (tempPage) {
      case "register":
        document.title = "Register";
        return (
          <Register
            setLoader={setLoader}
            setError={setError}
            setPage={setPage}
          />
        );
      case "login":
        document.title = "Login";
        return (
          <Login setPage={setPage} setError={setError} setLoader={setLoader} />
        );
      case "forgot":
        document.title = "Forgot Password";
        return (
          <ForgotPassword
            setPage={setPage}
            setError={setError}
            setLoader={setLoader}
          />
        );
      case "anonymous":
        document.title = "Anonymous Login";
        return (
          <AnonymousLogin
            setPage={setPage}
            setError={setError}
            setLoader={setLoader}
          />
        );
      default:
        document.title = "Not found";
        return (
          <p style={{ zIndex: 1, marginTop: "30%" }}>
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
          style={{ zIndex: 2, margin: -23, marginTop: -24 }}
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
