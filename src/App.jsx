import React, { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Message from "./components/Message";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
function App() {
  const Home = React.lazy(() => import("./pages/Home/Home"));
  const Login = React.lazy(() => import("./pages/Login/Login"));
  const Signup = React.lazy(() => import("./pages/Signup/Signup"));

  return (
    <>
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
