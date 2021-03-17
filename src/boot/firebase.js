// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";
require('firebase/firestore')

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyD22FHl7ERk44bLp4xV1lyLWOVfUQ0WOxo",
    authDomain: "tutorage-c258d.firebaseapp.com",
    projectId: "tutorage-c258d",
    storageBucket: "tutorage-c258d.appspot.com",
    messagingSenderId: "209948946918",
    appId: "1:209948946918:web:735ff432fefe6799052627",
    measurementId: "G-7GEVB118MJ"
  };
  
  // Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseDB = firebaseApp.database()
const firestore = firebaseApp.firestore()


export {firebaseDB, firestore}
