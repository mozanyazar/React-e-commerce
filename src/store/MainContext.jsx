import { async } from "@firebase/util";
import {
  doc,
  getDoc,
  arrayRemove,
  arrayUnion,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { object } from "yup";
import { db } from "../firebase";
import { AuthStore } from "./Auth";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { wishList, setWishList, basket, setBasket, user } = AuthStore();
  const [modalToggle, setModalToggle] = useState({
    isOpen: false,
    items: {},
  });
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [price, setPrice] = useLocalStorageState("price", {
    defaultValue: 1200,
  });
  const [sideCategory, setSideCategory] = useLocalStorageState("sideCategory", {
    defaultValue: [
      {
        menu: "all",
        isClicked: true,
        priceMax: 1200,
      },
      {
        menu: "electronics",
        isClicked: false,
        priceMax: 1200,
      },
      {
        menu: "jewelery",
        isClicked: false,
        priceMax: 1200,
      },
      {
        menu: "men's clothing",
        isClicked: false,
        priceMax: 1200,
      },
      {
        menu: "women's clothing",
        isClicked: false,
        priceMax: 1200,
      },
    ],
  });
  const [initialProduct, setİnitialProduct] = useState([]);

  // modal toggle
  const modalHandler = (singleProduct) => {
    if (typeof singleProduct == "object") {
      document.getElementsByTagName("html")[0].style.cssText =
        "overflow-y:hidden";
      setModalToggle({
        isOpen: true,
        items: { ...singleProduct },
      });
    } else {
      document.getElementsByTagName("html")[0].style.cssText =
        "overflow-y:initial";
      setModalToggle({
        isOpen: false,
        items: {},
      });
    }
  };
  // calculate the total basket price
  useEffect(() => {
    if (basket.length <= 0) return;
    var total = basket.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    console.log(total);
  }, [basket]);

  // add item to basket
  const addBasket = async (item) => {
    const addToBasket = doc(db, "basket", user.uid);

    if (user) {
      let isExist = basket.find((e) => e.id == item.id);
      if (isExist === undefined) {
        const obj = {
          ...item,
          quantity: 1,
        };
        setBasket((prev) => [...prev, obj]);
        await updateDoc(addToBasket, {
          basket: arrayUnion({
            ...obj,
          }),
        });
      } else if (isExist !== undefined) {
        console.log(isExist);
        let increment = isExist.quantity + 1;
        const filter = basket.filter((e) => e.id !== item.id);
        setBasket(filter);
        const obj = {
          ...item,
          quantity: increment,
        };
        await setBasket((prev) => [...prev, obj]);
        await setDoc(addToBasket, {
          basket,
        });
      }
    } else {
      document.getElementsByTagName("html")[0].style.cssText =
        "overflow-y:initial";
      setModalToggle({
        isOpen: false,
        items: {},
      });
      navigate("/login");
    }
  };

  // add wishlist
  const addToWishList = async (items) => {
    try {
      const updateWishList = doc(db, "wishlist", user.uid);
      await updateDoc(updateWishList, {
        wishlist: arrayUnion({
          ...items,
        }),
      });
      setWishList((prev) => [...prev, items]);
    } catch (error) {
      console.log(error);
    }
  };

  // remove wishlist
  const removeToWishList = async (items) => {
    try {
      const updateWishList = doc(db, "wishlist", user.uid);
      await updateDoc(updateWishList, {
        wishlist: arrayRemove({
          ...items,
        }),
      });
      const removeItems = wishList.filter((e) => e.id !== items.id);
      setWishList(removeItems);
    } catch (error) {
      console.log(error);
    }
  };

  //  sidebar open and close function, the key coming from Header and Sidebar component
  const sidebarToggleHandler = (key) => {
    if (key == "open") {
      document.documentElement.style.overflow = "hidden";
      setSidebarToggle(true);
    } else {
      document.documentElement.style.overflow = "initial";
      setSidebarToggle(false);
    }
  };

  const values = {
    sidebarToggleHandler,
    sidebarToggle,
    sideCategory,
    setSideCategory,
    initialProduct,
    setİnitialProduct,
    setPrice,
    price,
    removeToWishList,
    addToWishList,
    modalToggle,
    modalHandler,
    addBasket,
  };

  return (
    <MainContext.Provider value={{ ...values }}>
      {children}
    </MainContext.Provider>
  );
};

export const MainStore = () => {
  return useContext(MainContext);
};
