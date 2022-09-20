import { auth } from "./firebase";
import firebase from "firebase/app";
import { setUserGlobalInfo } from "../../util/helper";

export const LoadNextPage = () => {
  try {
    let tempUrl = window.location.href.split("?");
    if (tempUrl.length > 1) {
      const url = new URLSearchParams(tempUrl[1]);
      let nextUrl = url.get("nexturl");
      //console.log("next page ", nextUrl);
      window.location.href = nextUrl;
      setUserGlobalInfo({
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        image: auth.currentUser.photoURL,
        name: auth.currentUser.displayName,
      });
    } else {
      window.location.href = "/";
      //console.log("next page ", "/");
    }
  } catch (error) {
    //console.log(error);
  }
};

export const signInAnonymously = (userName, setLoader, setError) => {
  setLoader(true);

  auth
    .signInAnonymously()
    .then(() => {
      //   window.location.href = "nextUrl";
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: userName,
        })
        .then(() => {
          // Update successful
          // ...
          LoadNextPage();
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
      setLoader(false);
    })
    .catch((error) => {
      var errorMessage = error.message;
      setError(errorMessage);
    });
};

export const signInUsingGoogle = (setLoader, setError) => {
  setLoader(true);
  var provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      LoadNextPage();
    })
    .catch((error) => {
      // Handle Errors here.
      var errorMessage = error.message;
      // The email of the user's account used.
      // The firebase.auth.AuthCredential type that was used.
      setError(errorMessage);
      setLoader(false);
      // ...
    });
};
export const signInUsingFacebook = (setLoader, setError) => {
  setLoader(true);
  var provider = new firebase.auth.FacebookAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      // The signed-in user info.
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      LoadNextPage();

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // The email of the user's account used.
      // The firebase.auth.AuthCredential type that was used.
      setError(error.message);
      setLoader(false);
      // ...
    });
};

export const signInUsingTwitter = (setLoader, setError) => {
  setLoader(true);
  var provider = new firebase.auth.TwitterAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      // The signed-in user info.
      LoadNextPage();

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // The email of the user's account used.
      setError(error.message);
      setLoader(false);
      // ...
    });
};

export const signInUsingMicrosoft = (setLoader, setError) => {
  setLoader(true);
  var provider = new firebase.auth.OAuthProvider("microsoft.com");
  provider.setCustomParameters({
    // Optional "tenant" parameter in case you are using an Azure AD tenant.
    // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
    // or "common" for tenant-independent tokens.
    // The default value is "common".
    tenant: "TENANT_ID",
  });
  auth
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      // The signed-in user info.
      //console.log(result);
      LoadNextPage();

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorMessage = error.message;
      // The email of the user's account used.
      // The firebase.auth.AuthCredential type that was used.
      setError(error.message);
      setLoader(false);
      //console.log(errorMessage);

      // ...
    });
};

export const signInUsingEmailPassword = (
  email,
  password,
  setLoader,
  setError
) => {
  setLoader(true);

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      setLoader(false);
      //console.log(userCredential);
      LoadNextPage();

      // ...
    })
    .catch((error) => {
      var errorMessage = error.message;
      setLoader(false);
      setError(errorMessage);
      //console.log(errorMessage);

      // ..
    });
};

export const registerInUsingEmailPassword = (
  email,
  password,
  username,
  setLoader,
  setError
) => {
  setLoader(true);

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = firebase.auth().currentUser;
      //console.log(userCredential);
      user
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          // Update successful
          // ...
          LoadNextPage();
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
      setLoader(false);
      // ...
    })
    .catch((error) => {
      var errorMessage = error.message;
      setLoader(false);
      //console.log(errorMessage);

      setError(errorMessage);
      // ..
    });
};
export const forgotPasswordAuth = (email, setLoader, setError) => {
  setLoader(true);
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
      setLoader(false);
      setError("");
      LoadNextPage();
    })
    .catch((error) => {
      var errorMessage = error.message;
      setLoader(false);
      setError(errorMessage);
      //console.log(errorMessage);
      // ..
    });
};
