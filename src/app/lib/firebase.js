// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBexNBUekcb1cgMCTIXK6YfSs0_dCEfGm0",
  authDomain: "codeaura-db.firebaseapp.com",
  projectId: "codeaura-db",
  storageBucket: "codeaura-db.firebasestorage.app",
  messagingSenderId: "70472720239",
  appId: "1:70472720239:web:9db1be7554134592d2d29a",
  measurementId: "G-T8F9RLE23P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
