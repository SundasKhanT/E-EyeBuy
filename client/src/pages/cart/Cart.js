import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, product) => {
        return prev + product.price * product.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);


  const increment = (id) => {
    cart.forEach((product) => {
      if (product._id === id) {
        product.quantity += 1;
      }
    });

    setCart([...cart]);
    // addToCart();
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    // addToCart();
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to remove this product?")) {
      const newCart = cart.filter((item) => item._id !== id);
      setCart(newCart);
      // addToCart();
    }
  };
  

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );
  }

  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product?.images?.url} alt="" />

          <div className="box-detail">
            <h2>{product.title}</h2>

            <span> Rs {product.price * product.quantity}</span>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button onClick={() => decrement(product._id)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}>+</button>
            </div>

            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: Rs: {total}</h3>
        <button
          onClick={() => navigate("/checkout", { state: { cart } })}
          total={total}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
