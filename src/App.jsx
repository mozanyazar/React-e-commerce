import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const Home = React.lazy(() => import("./pages/Home"));

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
