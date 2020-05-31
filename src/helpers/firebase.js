import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: processess.env.FIREBASEAPI,
  authDomain: "journeytomaketime.firebaseapp.com",
  webClientId: processess.env.FIREBASECLIENT,
  projectId: "journeytomaketime",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const provider = new firebase.auth.GoogleAuthProvider();
