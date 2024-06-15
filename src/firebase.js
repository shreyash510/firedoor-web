// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0Q1uD419kBsDoL4HDtuSKAD7TX-LpwNg",
    authDomain: "firedoor-4e3e9.firebaseapp.com",
    projectId: "firedoor-4e3e9",
    storageBucket: "firedoor-4e3e9.appspot.com",
    messagingSenderId: "785844145206",
    appId: "1:785844145206:web:7a0e36f584a8054675dc97",
    measurementId: "G-PKRQVB1EC9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the initialized services
export { db, auth };