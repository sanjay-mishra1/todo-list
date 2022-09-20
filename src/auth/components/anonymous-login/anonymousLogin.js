import React, { useState } from "react";
import { signInAnonymously } from "../../authHandler/authUtil";
import { setNameToPageURL } from "../../helper";
export default function AnonymousLogin({ setPage, setError, setLoader }) {
  const [userName, setUserName] = useState("");
  const handleClick = () => {
    setNameToPageURL("register");
    setPage("register");
  };
  const startAuth = (event) => {
    event.preventDefault();
    //console.log(event, userName);
    if (userName) {
      //console.log("username is " + userName);
      setLoader("Logging you in. Please wait...");
      signInAnonymously(userName, setLoader, setError);
    } //else //console.log("username is empty");
  };
  return (
    <React.Fragment>
      <form className="form__auth" id="b-form" method="" action="">
        <h2 className="form_title__auth title__auth">Anonymous Login</h2>

        <input
          autoComplete="name"
          className="form__input__auth"
          type="name"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          placeholder="Your name"
        />
        <button
          onClick={startAuth}
          className="form__button__auth button__auth submit__auth"
        >
          SIGN IN
        </button>
      </form>
      <div className="link-section__auth">
        Not have a account?{" "}
        <button
          onClick={() => handleClick("register")}
          className="link-action__auth"
        >
          {" "}
          Register
        </button>
      </div>
    </React.Fragment>
  );
}
