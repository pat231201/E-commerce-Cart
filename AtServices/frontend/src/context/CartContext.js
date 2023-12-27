// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
const CART_STORAGE_KEY = "CART";
export const CartProvider = ({ children }) => {
  // const [cart, setCart] = useState(() => {
  //   const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  //   return storedCart ? JSON.parse(storedCart) : [];
  // });
  // useEffect(() => {
  //   localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  // }, [cart]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              count: setCount((prevCount) => prevCount + 1),
            }
          : item
      );
      setCart(updatedCart);
    } else {
      const updatedProduct = {
        ...product,
        quantity: 1,
        count: setCount((prevCount) => prevCount + 1),
      };
      setCart([...cart, updatedProduct]);
    }

    const updatedTotal = total + product.price;
    setTotal(updatedTotal);
  };

  const updateCartItem = (product, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
    if (newQuantity === product.quantity + 1) {
      setTotal(total + product.price);
    }
    if (newQuantity === product.quantity - 1) {
      setTotal(total - product.price);
    }

    setCart(updatedCart);
  };

  const removeCartItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        count,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
