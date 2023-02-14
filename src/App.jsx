import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const Home = React.lazy(() => import("./pages/Home"));
  const Login = React.lazy(() => import("./pages/Login"));

  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<h1>loading...</h1>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<h1>loading ...</h1>}>
              <Login />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
