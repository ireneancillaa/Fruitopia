import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCShlEtz2TS_n0MoDM6axiGMiVypejT-44",
  authDomain: "fruitopia-8cc29.firebaseapp.com",
  projectId: "fruitopia-8cc29",
  storageBucket: "fruitopia-8cc29.appspot.com",
  messagingSenderId: "927417286178",
  appId: "1:927417286178:web:644864411373e9a117947b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
