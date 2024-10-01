import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGFaUqGRTyEn8yt98npzd4gn5Wu05dBtQ",
  authDomain: "taskplus-14e89.firebaseapp.com",
  projectId: "taskplus-14e89",
  storageBucket: "taskplus-14e89.appspot.com",
  messagingSenderId: "102077607351",
  appId: "1:102077607351:web:fbd075d8e04bacdfd00c32",
  measurementId: "G-86KPS7QGN8"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export {db}