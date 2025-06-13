import { initializeApp } from "firebase/app";
import adminAuthf from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgKSxKqR5PaYyl1s238OwHeAHivVKzpzU",
  authDomain: "mychat-mvp.firebaseapp.com",
  projectId: "mychat-mvp",
  storageBucket: "mychat-mvp.firebasestorage.app",
  messagingSenderId: "947041095084",
  appId: "1:947041095084:web:b1dc30bd202a12576abe09",
  measurementId: "G-V9LP7MH8QZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const adminAuth = adminAuthf;

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
