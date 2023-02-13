import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes></Routes>
    </>
  );
}

export default App;
