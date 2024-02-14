const {initializeApp} = require('firebase/app')


const firebaseConfig = {
  apiKey: "AIzaSyBGptCfEHEFQNuRc43ep9HGBynRTpHkVhk",
  authDomain: "blinkit-12243.firebaseapp.com",
  projectId: "blinkit-12243",
  storageBucket: "blinkit-12243.appspot.com",
  messagingSenderId: "314343179993",
  appId: "1:314343179993:web:2884ee6e706d32d24e60c8",
};

function initializeFirebaseApp() {
  initializeApp(firebaseConfig)
}

module.exports = { initializeFirebaseApp };
