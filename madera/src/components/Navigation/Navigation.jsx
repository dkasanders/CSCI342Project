import React from "react";
import { Link } from "react-router-dom";

import './Navigation.css'

import SearchBar from '../searchBar/SearchBar'
import './../../index.css'
import Logo from '../../assets/logo.png'

function Navigation() {

    return (
      <div>
        <div className="navigation">
          <img
            className="maderialogo-icon12"
            loading="lazy"
            alt=""
            src={Logo}
          />
            <h1><Link to="/">Madera</Link></h1>
            <div className="buttons">
              <Link to="/shop">Shop</Link>
              <Link to="/about">About Us</Link>
              <Link to="/cart">Cart</Link>
            </div>
            <div className="signup">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
        </div>
      </div>
    )
}

export default Navigation;