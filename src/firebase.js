import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfkrJ5IBnKBrh9RaThVca34wnqy89l2ng",
  authDomain: "ecommerce-88a15.firebaseapp.com",
  databaseURL:
    "https://ecommerce-88a15-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecommerce-88a15",
  storageBucket: "ecommerce-88a15.appspot.com",
  messagingSenderId: "25354650191",
  appId: "1:25354650191:web:546632fcdfcf957f2ae03a",
  measurementId: "G-NLEXB7VYVJ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
