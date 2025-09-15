import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { Analytics, getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBVF2evBOqA-dIkeRpwIpwlfqsNU5FxVnQ",
  authDomain: "chainmod-81afd.firebaseapp.com",
  databaseURL: "https://chainmod-81afd-default-rtdb.firebaseio.com",
  projectId: "chainmod-81afd",
  storageBucket: "chainmod-81afd.firebasestorage.app",
  messagingSenderId: "111062445966",
  appId: "1:111062445966:web:e4442a67611c8bc68ebedf",
  measurementId: "G-E3EZVMP54T",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

// Connect to the emulators in development
if (process.env.NEXT_PUBLIC_USE_EMULATORS === "true") {
  console.log("Development mode: connecting to Firestore emulator");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

let analytics: Analytics;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
