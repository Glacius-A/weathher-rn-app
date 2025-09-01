import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaRZRtRrLPqg3Hld6_H16Wdi73H6Zba8k",
  authDomain: "weather-rn-adde0.firebaseapp.com",
  projectId: "weather-rn-adde0",
  storageBucket: "weather-rn-adde0.firebasestorage.app",
  messagingSenderId: "934123368974",
  appId: "1:934123368974:web:53fd286ed6b363678b825f",
  measurementId: "G-8FS1SVWJPF",
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
export { firebase, authentication };
