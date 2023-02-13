import { createContext, useState, useContext } from "react";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  
  
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

  const values = { basket, sidebarToggleHandler, sidebarToggle };

  return (
    <MainContext.Provider value={{ ...values }}>
      {children}
    </MainContext.Provider>
  );
};

export const MainStore = () => {
  return useContext(MainContext);
};
