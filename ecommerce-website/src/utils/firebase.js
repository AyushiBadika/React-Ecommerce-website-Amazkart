// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-FNHe3ITLX8DO0OD9RyrRzl96RqPfX1s",
  authDomain: "mct-ecommerce-website-db.firebaseapp.com",
  projectId: "mct-ecommerce-website-db",
  storageBucket: "mct-ecommerce-website-db.appspot.com",
  messagingSenderId: "520801283608",
  appId: "1:520801283608:web:27c461af4e5a2b50521d6d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
