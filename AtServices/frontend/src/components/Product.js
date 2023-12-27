//Product.js
import React from "react";
import Cart from "./Cart";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
const Product = () => {
  const { addToCart, count } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  // [
  //   { id: 1, name: "Product 1", price: 100, quantity: 0 },
  //   { id: 2, name: "Product 2", price: 200, quantity: 0 },
  // ]
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product");
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  // const [count, setCount] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleClick = () => {
    <Cart cart={cart} total={total} />;
    navigate("/cart", { state: { cart, total } });
  };
  const handleAddToCart = (product) => {
    // const existingItem = cart.find((item) => item.id === product.id);
    addToCart(product);
    // if (existingItem) {
    //   const updatedCart = cart.map((item) =>
    //     item.id === product.id
    //       ? {
    //           ...item,
    //           quantity: item.quantity + 1,
    //           count: setCount((prevCount) => prevCount + 1),
    //         }
    //       : item
    //   );
    //   setCart(updatedCart);
    // } else {
    //   const updatedProduct = {
    //     ...product,
    //     quantity: 1,
    //     count: setCount((prevCount) => prevCount + 1),
    //   };
    //   setCart([...cart, updatedProduct]);
    // }
    // setIsCartVisible(true);

    // const updatedTotal = total + product.price;
    // setTotal(updatedTotal);
  };

  return (
    <div className="App">
      <header>
        <span onClick={handleClick}>Cart {count}</span>
      </header>
      <div>
        <h1>Products</h1>
        <div>
          {products ? (
            products.map((product) => (
              <div key={product._id}>
                <h2>{product.product_name}</h2>
                <p>Price: ${product.product_price}</p>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
