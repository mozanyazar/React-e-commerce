import { async } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({
    isSucces: false,
    message: undefined,
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  // sign out

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        setMessage({
          isSucces: true,
          message: "successful",
        });
      })
      .catch((e) => {
        setMessage({
          isSucces: true,
          message: e.message,
        });
      });
  };

  // create a collections wishlist, basket
  const createCollections = async (user) => {
    try {
      await setDoc(doc(db, "wishlist", user.user.uid), {});
      await setDoc(doc(db, "basket", user.user.uid), {});
    } catch (e) {
      console.log(e.message);
    }
  };

  // LOGIN //

  const signInFn = async (email, password) => {
    console.log(email);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        setMessage({
          isSucces: true,
          message: "Sign In Successful ",
        });
      });
    } catch (e) {
      setMessage({
        isSucces: false,
        message: e.message,
      });
    }
  };

  // ** SIGN UP ** //

  //signup with facebook
  const facebookProvider = new FacebookAuthProvider();
  const signupWithFacebook = async () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setMessage({
          isSucces: true,
          message: "Successful",
        });
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  //Sign up with Google
  const Googleprovider = new GoogleAuthProvider();
  const signupWithGoogle = async () => {
    signInWithPopup(auth, Googleprovider)
      .then((result) => {
        setMessage({
          isSucces: true,
          message: "Successful",
        });
      })
      .catch((error) => {
        setMessage({
          isSucces: false,
          message: error.message,
        });
      });
  };

  // Sign up with form
  const createUser = async (email, password, name) => {
    try {
      createUserWithEmailAndPassword(auth, email, password, name).then(
        (userCredential) => {
          setMessage({
            isSucces: true,
            message: "Successful",
          });
          createCollections(userCredential);
        }
      );
    } catch (e) {
      setMessage({
        isSucces: false,
        message: e.message,
      });
    }
  };

  const values = {
    createUser,
    signupWithGoogle,
    signupWithFacebook,
    message,
    setMessage,
    user,
    signInFn,
    logOut,
  };

  return <Auth.Provider value={{ ...values }}>{children}</Auth.Provider>;
};

export const AuthStore = () => {
  return useContext(Auth);
};
