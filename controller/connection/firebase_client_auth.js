var firebase = require("firebase");
// require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyBICWgb5edTIYgmO2NOitLWNPokm6ZqFbs",
  authDomain: "flix-10157.firebaseapp.com",
  databaseURL: "https://flix-10157.firebaseio.com",
  projectId: "flix-10157",
  storageBucket: "flix-10157.appspot.com",
  messagingSenderId: "533006120013",
  appId: "1:533006120013:web:ee4ce599eece6a6a785804"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
module.exports = firebase;
