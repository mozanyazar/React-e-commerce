import { createContext, useEffect, useState, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { MainStore } from "./MainContext";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const {
    setSideCategory,
    sideCategory,
    initialProduct,
    setİnitialProduct,
    price,
  } = MainStore();

  // listing by price
  const listingByPrice = (data) => {
    const filterProducts = data.filter((product) => product.price <= price);
    setİnitialProduct(filterProducts);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  useEffect(() => {
    setLoading(false);
    listingByPrice(data);
  }, [price]);

  // fetching All Category (default)
  const getAllCategories = async () => {
    try {
      let res = await fetch("https://fakestoreapi.com/products");
      let data = await res.json();
      listingByPrice(data);
      setData(data);
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
      listingByPrice(data);
      setData(data);
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
  }, [sideCategory]);

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
