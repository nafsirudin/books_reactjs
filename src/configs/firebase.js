// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAvrYv0c2e3JbUVXil1OjF51FWkl1PaaEE",
  authDomain: "books-a974c.firebaseapp.com",
  projectId: "books-a974c",
  storageBucket: "books-a974c.appspot.com",
  messagingSenderId: "630057727121",
  appId: "1:630057727121:web:d0f7c2fd1045afee32bb30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);