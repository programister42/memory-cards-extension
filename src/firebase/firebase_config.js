import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOniFHvCv09ad8ASt0PTK_VNEqQWOhrTI",
  authDomain: "memorycards-1.firebaseapp.com",
  projectId: "memorycards-1",
  storageBucket: "memorycards-1.appspot.com",
  messagingSenderId: "710523153986",
  appId: "1:710523153986:web:ed3badd6ad28b92dbf87db",
  measurementId: "G-1QTK0WGP8R",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
