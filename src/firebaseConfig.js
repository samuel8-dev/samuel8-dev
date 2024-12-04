import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC93jHut9MfV_NQMka-4eMZ40VYiM_Cvo0",
  authDomain: "love-cc3d1.firebaseapp.com",
  projectId: "love-cc3d1",
  storageBucket: "love-cc3d1.firebasestorage.app",
  messagingSenderId: "1044543767969",
  appId: "1:1044543767969:web:d41da0630bed36987ef7e0",
  measurementId: "G-XQJLZG8PER"
};
// firebaseConfig.js

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase authentication
const firestore = getFirestore(app); // Firestore

export { auth, firestore };
