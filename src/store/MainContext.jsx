import { async } from "@firebase/util";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import { db } from "../firebase";
import { AuthStore } from "./Auth";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const { wishList, setWishList, basket, setBasket, user } = AuthStore();
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
  // const wishListSnapShot = async () => {
  //   if (user !== null) {
  //     console.log(user);

  //     const docRef = doc(db, "wishlist", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log(docSnap.data());
  //       console.log("hellooo !");
  //       setWishList(docSnap.data());
  //     }
  //   }
  // };
  // useEffect(() => {
  //   wishListSnapShot();
  // }, [user]);

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
