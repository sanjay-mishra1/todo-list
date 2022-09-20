import React, { useState } from "react";
import { forgotPasswordAuth } from "../../authHandler/authUtil";
import { setNameToPageURL } from "../../helper";

export default function ForgotPassword({ setPage, setError, setLoader }) {
  const [email, setEmail] = useState("");
  const handleClick = () => {
    setNameToPageURL("register");
    setPage("register");
  };
  const startAuth = (event) => {
    event.preventDefault();
    if (email) {
      setLoader("Logging you in. Please wait...");
      forgotPasswordAuth(email, setLoader, setError);
    } //else //console.log("email is empty");
  };
  return (
    <React.Fragment>
      <form className="form__auth" id="b-form" method="" action="">
        <h2 className="form_title__auth title__auth">Forgot password</h2>

        <input
          autoComplete="email"
          className="form__input__auth"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Your email address"
        />
        <button
          onClick={startAuth}
          className="form__button__auth button__auth submit__auth"
        >
          Send request
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
