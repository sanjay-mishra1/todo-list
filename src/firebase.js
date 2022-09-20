import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDe9yym0sxHeGXEFmp946CYIt-_LwNzdiM",
  authDomain: "meta-doc.firebaseapp.com",
  projectId: "meta-doc",
  storageBucket: "meta-doc.appspot.com",
  messagingSenderId: "117618408677",
  appId: "1:117618408677:web:8886e4084c524b1f33e80c",
  databaseURL:
    "https://meta-doc-default-rtdb.asia-southeast1.firebasedatabase.app/",
});
const uid = localStorage.getItem("userEmail") ?? "not found";
const database = firebaseConfig
  .firestore()
  .collection("userDocs")
  .doc(uid)
  .collection("TodoList")
  .doc("list");
const auth = firebaseConfig.auth();
export { auth };
// export { firebaseConfig as firebase };
export default database;
