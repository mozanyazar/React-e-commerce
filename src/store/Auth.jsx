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
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { auth, db } from "../firebase";
const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  const [user, setUser] = useLocalStorageState("user", { defaultValue: null });
  const [message, setMessage] = useState({
    isSucces: false,
    message: undefined,
  });
  const [basket, setBasket] = useState([]);
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        wishListSnapShot(currentUser.uid);
        basketListSnapShot(currentUser.uid);
      } else {
        setUser(null);
        setWishList([]);
        setBasket([]);
        setTotalPrice(0);
      }
    });
  }, []);

  // wishlist snapshot login and signup
  const wishListSnapShot = async (userId) => {
    const docRef = doc(db, "wishlist", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("wish");
      setWishList(docSnap.data().wishlist);
    }
  };
  // basket snapshot login and signup
  const basketListSnapShot = async (userId) => {
    const docRef = doc(db, "basket", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("basket");
      setBasket(docSnap.data().basket);
    }
  };

  // sign out
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        setMessage({
          isSucces: true,
          message: "successful",
        });
        navigate("/");
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
      await setDoc(doc(db, "wishlist", user.user.uid), {
        wishlist: [],
      });
      await setDoc(doc(db, "basket", user.user.uid), {
        basket: [],
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  // LOGIN //

  const signInFn = async (email, password) => {
    console.log(email);
    try {
      await signInWithEmailAndPassword(auth, email, password).then((user) => {
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
        createCollections(result);
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
        createCollections(result);
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
    wishList,
    setWishList,
    basket,
    setBasket,
    totalPrice,
    setTotalPrice,
  };

  return <Auth.Provider value={{ ...values }}>{children}</Auth.Provider>;
};

export const AuthStore = () => {
  return useContext(Auth);
};
