import { setUserGlobalInfo } from "../util/helper";
import { auth } from "../firebase";

export const getSession = (setUser, autoLogin = false) => {
  //console.log("geeting sessions");

  let temp = auth.onAuthStateChanged((user) => {
    if (!user || !user.uid) {
      if (autoLogin) {
        //console.log("auto login initiated");
        login();
      }
    } else {
      let userData = {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        uid: user.email,
      };
      setUser(userData);
      setUserGlobalInfo(userData);
    }
  });
  temp = null;
};
export const login = () => {
  // let res = auth.signInAnonymously();
  // return res;
  // //console.log("Login called");
  window.location.href = "/auth?page=login&nexturl=" + window.location.pathname;
};

export const logout = () => {
  localStorage.clear();
  auth.signOut();
};
export const handleUnAuthSession = () => {
  window.location.href = "/";
};
