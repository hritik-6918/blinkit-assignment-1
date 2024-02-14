// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGptCfEHEFQNuRc43ep9HGBynRTpHkVhk",
  authDomain: "blinkit-12243.firebaseapp.com",
  projectId: "blinkit-12243",
  storageBucket: "blinkit-12243.appspot.com",
  messagingSenderId: "314343179993",
  appId: "1:314343179993:web:2884ee6e706d32d24e60c8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
