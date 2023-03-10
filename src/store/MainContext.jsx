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
  const {
    wishList,
    setWishList,
    basket,
    setBasket,
    user,
    setTotalPrice,
    totalPrice,
    setMessage,
  } = AuthStore();
  const navigate = useNavigate();
  const [modalToggle, setModalToggle] = useState({
    isOpen: false,
    items: {},
  });

  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [price, setPrice] = useLocalStorageState("price", {
    defaultValue: 1200,
  });
  const [search, setSearch] = useState("");

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
  // SEARCH
  const searchHandler = (event) => {
    if (event.key === "Enter" && search.trim() !== "") {
      navigate(`search/${search}`);
    } else if (search.trim() == "") {
      setMessage({
        isSucces: false,
        message: "type it !",
      });
    }
  };
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
    if (basket.length <= 0) return setTotalPrice(0);
    var total = basket.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  }, [basket]);

  // remove item from basket
  const removeBasket = async (item) => {
    const removeFromBasket = doc(db, "basket", user.uid);

    // if product quantity is 1 delete the product on the basket
    if (item.quantity === 1) {
      let filter = basket.filter((product) => product.id !== item.id);
      setBasket(filter);
      await updateDoc(removeFromBasket, {
        basket: arrayRemove({
          ...item,
        }),
      });
    }
    //find the item and quantity -1
    else if (item.quantity > 1) {
      let obj = [...basket];
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].id === item.id) {
          obj[i].quantity -= 1;
        }
      }
      await setBasket(obj);
      await setDoc(removeFromBasket, {
        basket,
      });
    }
    setMessage({
      isSucces: true,
      message: "removed!",
    });
  };

  // add item to basket
  const addBasket = async (item) => {
    if (user) {
      const addToBasket = doc(db, "basket", user.uid);
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
        let obj = [...basket];
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].id === item.id) {
            obj[i].quantity += 1;
          }
        }
        console.log(obj);
        await setBasket(obj);
        await setDoc(addToBasket, {
          basket,
        });
      }
      setMessage({
        isSucces: true,
        message: "added!",
      });
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
      setMessage({
        isSucces: true,
        message: "added!",
      });
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
      setMessage({
        isSucces: true,
        message: "removed!",
      });
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
    removeBasket,
    searchHandler,
    search,
    setSearch,
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
