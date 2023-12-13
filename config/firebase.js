// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBIavwhCNLqUyYT6ZMKiR-myuKbkMOBs0A",
    authDomain: "saudagar-92dc2.firebaseapp.com",
    projectId: "saudagar-92dc2",
    storageBucket: "saudagar-92dc2.appspot.com",
    messagingSenderId: "505071838454",
    appId: "1:505071838454:web:9991becf5e57b04a1938d7",
    measurementId: "G-XGCJN7DQEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth }