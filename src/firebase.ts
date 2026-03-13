import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD91KppHAVIo-OCbMTzw4PBz1IrYL35QF8",
  authDomain: "rethinksabha-ea53d.firebaseapp.com",
  projectId: "rethinksabha-ea53d",
  storageBucket: "rethinksabha-ea53d.firebasestorage.app",
  messagingSenderId: "345268093835",
  appId: "1:345268093835:web:958ff52e32b118b91e658e",
  measurementId: "G-Q33YDCLPMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely (can fail in some iframe environments)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Analytics failed to initialize:", error);
}

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider, signInWithPopup, signOut };
