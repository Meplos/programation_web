import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCKmZw-3IpdIznfg4lLvF0o9QfOI-MybKE",
  authDomain: "blog-6d367.firebaseapp.com",
  databaseURL: "https://blog-6d367.firebaseio.com",
  projectId: "blog-6d367",
  storageBucket: "blog-6d367.appspot.com",
  messagingSenderId: "602968283612",
  appId: "1:602968283612:web:f9b53eb7f2e3e7da7fd719",
  measurementId: "G-L85E05KP0V",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
