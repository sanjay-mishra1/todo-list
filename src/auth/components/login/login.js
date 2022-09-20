import React, { useState } from "react";
import { signInUsingEmailPassword } from "../../authHandler/authUtil";
import { setNameToPageURL } from "../../helper";
import AuthList from "../authList/authList";

export default function Login({ setPage, setError, setLoader }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = (page) => {
    // window.history.pushState("", "", `${window.location.origin}?page=${page}`);
    setNameToPageURL(page);
    setPage(page);
  };
  const startAuth = (event) => {
    event.preventDefault();
    signInUsingEmailPassword(email, password, setLoader, setError);
  };
  return (
    <React.Fragment>
      <form className="form__auth" id="b-form" method="" action="">
        <h2 className="form_title__auth title__auth">Sign in</h2>
        <AuthList setError={setError} setLoader={setLoader} />

        <p className="or-field__auth">or</p>
        <div className="link-section__auth">
          <div
            onClick={() => handleClick("anonymous")}
            className="link-action__auth"
          >
            Login Anonymously
          </div>
        </div>

        <p className="or-field__auth">or</p>

        <span className="form__span__auth">use your email account</span>

        <input
          autoComplete="email"
          className="form__input__auth"
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Email"
        />
        <input
          autoComplete="current-password"
          className="form__input__auth"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Password"
        />
        <div className="link-section">
          <div
            onClick={() => handleClick("forgot")}
            className="link-action__auth"
          >
            Forgot password
          </div>
        </div>
        <button
          onClick={startAuth}
          type="submit"
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
