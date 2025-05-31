import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAps9sNrxc3F0K-TO-fhKnFYk74OjAbwuU",
  authDomain: "websitetogether-23345.firebaseapp.com",
  projectId: "websitetogether-23345",
  storageBucket: "websitetogether-23345.firebasestorage.app",
  messagingSenderId: "571147987977",
  appId: "1:571147987977:web:1e01b95b9c950dce115cd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };