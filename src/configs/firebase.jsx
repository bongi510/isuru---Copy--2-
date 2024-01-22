import firebase from "firebase/compat";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAl4pGHKnO3fTg9zbM2lSleQtbRBN97BVA",
  authDomain: "isuru-97e0f.firebaseapp.com",
  projectId: "isuru-97e0f",
  storageBucket: "isuru-97e0f.appspot.com",
  messagingSenderId: "85036953915",
  appId: "1:85036953915:web:ea1a5ee68d85aa46d6471e",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export { db, auth };
