import firebase from "firebase/app";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyDe9yym0sxHeGXEFmp946CYIt-_LwNzdiM",
  authDomain: "meta-doc.firebaseapp.com",
  projectId: "meta-doc",
  storageBucket: "meta-doc.appspot.com",
  messagingSenderId: "117618408677",
  appId: "1:117618408677:web:8886e4084c524b1f33e80c",
  databaseURL:
    "https://meta-doc-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {}

const auth = firebase.auth();
export { auth };
