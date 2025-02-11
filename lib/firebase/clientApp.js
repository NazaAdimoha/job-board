// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALkjNkR_neqakk9MPF3UP4_Smi4pfnBr0",
  authDomain: "job-board-ng.firebaseapp.com",
  projectId: "job-board-ng",
  storageBucket: "job-board-ng.firebasestorage.app",
  messagingSenderId: "157539812691",
  appId: "1:157539812691:web:29b656b2c1c2ae52034da6",
  measurementId: "G-5JE014KKJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);

export { auth, app, analytics, db };