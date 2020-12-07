import firebase from 'firebase';
require("@firebase/firestore");

  var firebaseConfig = {
    apiKey: "AIzaSyDZuQDRfwZ6G4LqOwcrjexJ0I0BuHEyHWU",
    authDomain: "story-cabin.firebaseapp.com",
    databaseURL: "https://story-cabin.firebaseio.com",
    projectId: "story-cabin",
    storageBucket: "story-cabin.appspot.com",
    messagingSenderId: "32395541790",
    appId: "1:32395541790:web:51d82905c709370f41dd0f"
  };
  
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();