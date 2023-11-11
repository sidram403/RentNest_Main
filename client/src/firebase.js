// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rentnest-main.firebaseapp.com",
  projectId: "rentnest-main",
  storageBucket: "rentnest-main.appspot.com",
  messagingSenderId: "444055308345",
  appId: "1:444055308345:web:79d88e1bce1492233a25e8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);