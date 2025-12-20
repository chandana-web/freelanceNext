import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "@/firebase/firebase";

export const googleRegister = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return {
    name: result.user.displayName,
    email: result.user.email,
    uid: result.user.uid,
    photo: result.user.photoURL,
  };
};

export const appleRegister = async () => {
  const result = await signInWithPopup(auth, appleProvider);
  return {
    name: result.user.displayName,
    email: result.user.email,
    uid: result.user.uid,
    photo: result.user.photoURL,
  };
};

