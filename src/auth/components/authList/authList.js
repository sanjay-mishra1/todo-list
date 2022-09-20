import React from "react";
import {
  signInUsingFacebook,
  signInUsingGoogle,
  signInUsingMicrosoft,
  signInUsingTwitter,
} from "../../authHandler/authUtil";

export default function AuthList({ setLoader, setError }) {
  return (
    <div className="form__icons__auth">
      <img
        onClick={() => {
          signInUsingGoogle(setLoader, setError);
        }}
        className="form__icon__auth"
        src="https://firebasestorage.googleapis.com/v0/b/meta-doc.appspot.com/o/MetaCalls-assets%2Fgoogle-dark-2.png?alt=media&token=83c777d2-823b-40ac-abf2-ceea0f009049"
        alt="google"
      />

      <img
        className="form__icon__auth"
        onClick={() => {
          signInUsingFacebook(setLoader, setError);
        }}
        src="https://firebasestorage.googleapis.com/v0/b/meta-doc.appspot.com/o/MetaCalls-assets%2Ffacebook-dark.png?alt=media"
        alt="facebook"
      />
      <img
        className="form__icon__auth"
        onClick={() => {
          signInUsingTwitter(setLoader, setError);
        }}
        src="https://firebasestorage.googleapis.com/v0/b/meta-doc.appspot.com/o/MetaCalls-assets%2Ftwitter-dark.png?alt=media"
        alt="twitter"
      />
      <img
        className="form__icon__auth"
        onClick={() => {
          signInUsingMicrosoft(setLoader, setError);
        }}
        src="https://firebasestorage.googleapis.com/v0/b/meta-doc.appspot.com/o/MetaCalls-assets%2Flinkedin-dark.png?alt=media"
        alt="linkedin"
      />
    </div>
  );
}
