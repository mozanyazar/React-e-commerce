import { createContext, useEffect, useState, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { MainStore } from "./MainContext";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const {
    setSideCategory,
    sideCategory,
    initialProduct,
    setİnitialProduct,
    price,
  } = MainStore();

  // fetching All Category (default)
  const getAllCategories = async () => {
    try {
      let res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();
      const filterPrice = data.filter((e) => e.price <= price);
      setİnitialProduct(filterPrice);
      setTimeout(() => {
        setLoading(true);
      }, 1500);
    } catch (error) {
      console.log(error.message);
    }
  };

  // fetching Specific Category
  const getSpecificCategory = async (category) => {
    try {
      const res = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      let data = await res.json();
      const filterPrice = data.filter((e) => e.price <= price);
      setİnitialProduct(filterPrice);
      setTimeout(() => {
        setLoading(true);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sideCategory.forEach((element) => {
      if (element.isClicked == true) {
        setLoading(false);
        if (element.menu == "all") {
          return getAllCategories();
        }
        return getSpecificCategory(element.menu);
      }
    });
  }, [sideCategory, price]);

  // category Update
  const sideCategoryUpdate = (menuName) => {
    const obj = [...sideCategory];
    obj.forEach((element) => {
      element.isClicked = false;
      element.priceMax = price;
    });
    obj.find((e) => e.menu == menuName).isClicked = true;
    setSideCategory(obj);
  };

  const values = { sideCategoryUpdate, loading };
  return (
    <ProductContext.Provider value={{ ...values }}>
      {children}
    </ProductContext.Provider>
  );
};

export const ApiStore = () => {
  return useContext(ProductContext);
};
