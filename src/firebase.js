import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Paste your config here, e.g.:
  apiKey: "AIzaSyC_MEO0J8Gn5Hr_g4p6V21PugHqcCLgi9Y",
  authDomain: "convertscout.firebaseapp.com",
  projectId: "convertscout",
  storageBucket: "convertscout.firebasestorage.app",
  messagingSenderId: "466529770216",
  appId: "1:466529770216:web:5339ecb91456adfe87475d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);