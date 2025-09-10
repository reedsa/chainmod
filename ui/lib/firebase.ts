import { initializeApp, getApps, getApp } from "firebase/app";
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

let analytics: Analytics;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
