import { setUserGlobalInfo } from "../util/helper";
import { auth } from "../firebase";

export const getSession = (setUser, autoLogin = false) => {
  //console.log("geeting sessions");

  let temp = auth.onAuthStateChanged((user) => {
    if (!user || !user.uid) {
      if (autoLogin) {
        //console.log("auto login initiated");
        login();
      } else setUser({ uid: "", email: "" });
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
export const login = (isReturn = false) => {
  let temp = "/auth?page=login&nexturl=" + window.location.pathname;
  if (!isReturn) window.location.href = temp;
  else return temp;
};
export const signUp = (isReturn) => {
  let temp = "/auth?page=register&nexturl=" + window.location.pathname;
  if (!isReturn) window.location.href = temp;
  else return temp;
};
export const logout = () => {
  localStorage.clear();
  auth.signOut();
  window.location.href = "/";
};
export const handleUnAuthSession = () => {
  window.location.href = "/";
};
