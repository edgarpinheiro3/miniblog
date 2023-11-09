import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA3PPP4cR1_ROL1RO2PykgbFAxQcUnznAM",
  authDomain: "miniblog-5a1f4.firebaseapp.com",
  projectId: "miniblog-5a1f4",
  storageBucket: "miniblog-5a1f4.appspot.com",
  messagingSenderId: "482260017734",
  appId: "1:482260017734:web:e3e31f536b86c5ef33e047"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };