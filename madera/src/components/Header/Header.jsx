import React from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png';

import './Header.css'

function Header() {

    return (
        <div className={`flex justify-between items-center py-4 px-8`}>
            <div className={`flex items-center`}>
                <img className={`h-8  mr-2`} alt="Logo" src={logo} />
                <Link to="/" className={`text-lg font-semibold text-white text-black outline-black hover:text-gray-600`}><h1>MADERIA</h1></Link>
            </div>
            <div className="">
                <div className={`flex space-x-4`}>
                    <Link to="/shop" className={`text-gray-800 hover:text-gray-600`}>Shop</Link>
                    <Link to="/about" className={`text-gray-800 hover:text-gray-600`}>About Us</Link>
                    <Link to="/cart" className={`text-gray-800 hover:text-gray-600`}>Cart</Link>
                </div>
            </div>    
            <div>
                <Link to="/login" className={`text-gray-800 hover:text-gray-600`}>Login</Link>
            </div>
        </div>
    )
}

export default Header; 