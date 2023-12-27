import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, total, updateCartItem } = useCart();

  if (!cart || !Array.isArray(cart)) {
    return (
      <div className="cart">
        <h2>Your Shopping Cart</h2>
        <p>Cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button
              onClick={() => {
                updateCartItem(item, item.quantity + 1);
              }}
            >
              +
            </button>{" "}
            {item.quantity}{" "}
            <button
              onClick={() => {
                updateCartItem(item, item.quantity - 1);
              }}
            >
              -
            </button>
            {/* <p>
              Total {item.name} price: ${item.quantity * item.price}
            </p> */}
          </div>
        ))}
      </ul>
      <ul>
        <h1>Cart Total</h1>
        {cart.map((item) => (
          <div key={item.id}>
            <h4>Product: {item.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>
              Total price <b>${item.quantity * item.price} </b>
            </p>
          </div>
        ))}
        <h2>Total: ${total}</h2>
      </ul>
    </div>
  );
};

export default Cart;
