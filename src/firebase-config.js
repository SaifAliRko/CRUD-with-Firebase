// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDyXNAKHClzjvG3UMwktL2symp2h2I18iU",
  authDomain: "crud-with-firebase-react.firebaseapp.com",
  projectId: "crud-with-firebase-react",
  storageBucket: "crud-with-firebase-react.appspot.com",
  messagingSenderId: "868250719621",
  appId: "1:868250719621:web:60351a08ac38299d6ae0ec",
  measurementId: "G-LET1VP7LFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;