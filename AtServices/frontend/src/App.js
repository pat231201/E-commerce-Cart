//App.js
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import React, { useState, useEffect } from "react";
import Product from "./components/Product";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product" element={<Product />}></Route>
          <Route path="cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </>
  );
}
export default App;
