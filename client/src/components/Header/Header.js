import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import "./Header.css";
import Menu from "../icons/menu.svg";
import Close from "../icons/close.svg";
import Cart from "../icons/cart.png";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;


  const logoutUser = async() =>{
    await axios.get('/user/logout')
    localStorage.removeItem('firstLogin')
    window.location.href='/'
 
  }


  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
        <li>
          <Link to="/type">Types</Link>
        </li>
        <li>
          <Link to="/shape">Shapes</Link>
        </li>
        <li>
          <Link to='/brand'>Brands</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>Logout</Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? 'Admin' : 'E-Eyebuy'}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link>
        </li>

        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login ✥ Register</Link>
          </li>
        )}

        <li>
          <img className="menu" src={Close} alt="" width="30" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/Cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
