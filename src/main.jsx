import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { MainContextProvider } from "./store/MainContext";
import { AuthProvider } from "./store/Auth";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MainContextProvider>
          <App />
        </MainContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
