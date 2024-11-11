// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB1O2PdLMO5aUdBTvjSouzxt8ioSPWQjM",
  authDomain: "email-password-auth-ac6b9.firebaseapp.com",
  projectId: "email-password-auth-ac6b9",
  storageBucket: "email-password-auth-ac6b9.firebasestorage.app",
  messagingSenderId: "959806407530",
  appId: "1:959806407530:web:b4c33f9d743e29a9cc5b13",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
