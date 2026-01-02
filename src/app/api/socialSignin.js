"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "../../firebase/firebase";

const formatUser = async (result) => {
  const user = result.user;

  const token = await user.getIdToken();

  return {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    provider: result.providerId,
    token,
  };
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return await formatUser(result);
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error;
  }
};

export const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    return await formatUser(result);
  } catch (error) {
    console.error("Apple Sign-in Error:", error);
    throw error;
  }
};
