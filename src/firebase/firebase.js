import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBx5zhvNhTAazge0UCpx7DCzgVnmKH5Xxc",
  authDomain: "freelancerexperts-8a6b1.firebaseapp.com",
  projectId: "freelancerexperts-8a6b1",
  storageBucket: "freelancerexperts-8a6b1.firebasestorage.app",
  messagingSenderId: "89333140804",
  appId: "1:89333140804:web:ae5e452d21c4f71dd29b11",
  measurementId: "G-16F96B0239"
};

// Avoid duplicate Firebase initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 🔥 Export single auth instance
export const auth = getAuth(app);

// 🔥 Export providers
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");

export default app;


