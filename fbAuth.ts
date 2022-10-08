// Import the functions you need from the SDKs you need
import { getApp, initializeApp,getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ0iSF9maf4kS_8hfz0Hn3g1lwrbr7aJg",
  authDomain: "myflix-c2a96.firebaseapp.com",
  projectId: "myflix-c2a96",
  storageBucket: "myflix-c2a96.appspot.com",
  messagingSenderId: "470627509934",
  appId: "1:470627509934:web:bca878d02003c230f62f3f",
  measurementId: "G-9LM8P4PJX1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// const analytics = getAnalytics(app);
const auth = getAuth();

export default app;
export { auth, db };