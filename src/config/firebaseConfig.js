import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaOdLRzqOCH8_3v_-aNmnGepjzzyQu3KE",
  authDomain: "batch5-bfcf2.firebaseapp.com",
  projectId: "batch5-bfcf2",
  storageBucket: "batch5-bfcf2.appspot.com",
  messagingSenderId: "1064615829929",
  appId: "1:1064615829929:web:9ef9c617198a00d862e4b8",
  measurementId: "G-ZJJY8PC7Q5",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
