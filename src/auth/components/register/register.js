import React, { useState } from "react";
import { registerInUsingEmailPassword } from "../../authHandler/authUtil";
import { setNameToPageURL } from "../../helper";
import AuthList from "../authList/authList";

export default function Register({ setPage, setError, setLoader }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleClick = () => {
    setNameToPageURL("login");
    setPage("login");
  };
  const startAuth = (event) => {
    event.preventDefault();
    registerInUsingEmailPassword(
      email,
      password,
      username,
      setLoader,
      setError
    );
  };
  return (
    <React.Fragment>
      <form className="form__auth" id="a-form" method="" action="">
        <h2 className="form_title__auth title__auth">Create Account</h2>

        <AuthList setError={setError} setLoader={setLoader} />
        <div className="or-field">or</div>
        <span className="form__span__auth">use email for registration</span>

        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          className="form__input__auth"
          type="name"
          autoComplete="name"
          placeholder="User name"
        />
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          autoComplete="email"
          className="form__input__auth"
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="form__input__auth"
          autoComplete="password"
          type="password"
          placeholder="Password"
        />
        <button
          onClick={startAuth}
          className="form__button__auth button__auth submit__auth"
        >
          SIGN UP
        </button>
      </form>
      <div className="link-section__auth">
        Already have a account?{" "}
        <button onClick={handleClick} className="link-action__auth">
          {" "}
          Login
        </button>
      </div>
    </React.Fragment>
  );
}
