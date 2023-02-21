import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Message from "./components/Message";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import { ProductContextProvider } from "./store/ProductApi";
import Modal from "./components/modal/Modal";
import SearchPage from "./pages/Search/SearchPage";
function App() {
  const Home = React.lazy(() => import("./pages/Home/Home"));
  const Login = React.lazy(() => import("./pages/Login/Login"));
  const Signup = React.lazy(() => import("./pages/Signup/Signup"));
  const Products = React.lazy(() => import("./pages/Products/Products"));

  return (
    <>
      <Modal />
      <Message />
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
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<h1>loading ...</h1>}>
              <ProtectedRoute>
                <Signup />
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/products"
          element={
            <Suspense fallback={<h1>Loading...</h1>}>
              <ProductContextProvider>
                <Products />
              </ProductContextProvider>
            </Suspense>
          }
        />

        <Route path="search">
          <Route
            path=":search"
            element={
              <Suspense fallback={<h1>Loading... </h1>}>
                <SearchPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
