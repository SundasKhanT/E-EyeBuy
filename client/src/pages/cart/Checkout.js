import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import axios from "axios";
import { GlobalState } from "../../GlobalState";

const Checkout = () => {
  const state = useContext(GlobalState);
  const [cart,setCart] = state.userAPI.cart;
  const [token] = state.token;
  // const[callback, setCallback] = state.userAPI.set

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");


  // Calculate the total price of all items in the cart
  const subtotal = cart?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 300;
  const total = subtotal + shipping;


  const handlePlaceOrder = async () => {
    // Check if all required fields are filled
    if (!name || !email || !address || !city || !postalCode ) {
      alert("Please fill in all required fields.");
      return;
    }

    //send a request to save the order details
    try {
      await axios.post(
        "/api/payment",
        {
          name,
          email,
          cart,
          city,
          postalCode,
          address, 
          total
        },
        {
          headers: { Authorization: token }
        }
      );

      await axios.patch(
        "/user/addcart",
        { cart: [] },
        {
          headers: { Authorization: token }
        }
      );

      alert("Your order has been placed ");
      setCart([]);
      navigate('/'); // navigate back
      // setCallback(!callback)
    } catch (error) {
      console.log("Failed to place order", error);
    }
  };


  return (
    <div className="checkout">
      <div className="left">
        <h2>Billing Details</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

<label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

<label htmlFor="postalcode">postal Code:</label>
          <input
            type="postalCode"
            id="postalCode"
            name="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </form>
      </div>

      <div className="right">
        <h2>Your Order</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th className="subtotal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.name} * {item.quantity}
                </td>
                <td>Rs{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Subtotal:</td>
              <td>₨{subtotal}</td>
            </tr>
            <tr>
              <td>Shipping Charges:</td>
              <td>₨{shipping}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>₨{total}</td>
            </tr>
          </tfoot>
        </table>

        <div className="payment-methods">
          <button>Cash on Delivery</button>
        </div>

        <div className="terms-and-conditions">
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms">
            I have read and agree to the website terms and conditions
          </label>
        </div>

        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
