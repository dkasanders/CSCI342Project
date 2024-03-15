import React from "react";
import { Link } from "react-router-dom";


function Header() {

    return (
        <div>
            <h1>Title</h1>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>

        </div>
    )
}

export default Header; 