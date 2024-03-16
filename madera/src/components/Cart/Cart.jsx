import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import CartItem from './CartItem';
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

function Cart() {

    const { user } = useSelector((state) => state.auth);

    const [id, updateID] = useState("");
    
    useEffect(() => {
        updateID(user.id);
    }, [user]);
    


    const getuserCart = (user_id) => {
        //api pull... 
        //updateuserCart
        fetch("http://www.localhost:3000/api/cart")
    }
    console.log(id);
    const [userCart, updateuserCart] = useState([])
    return (
        <>
            <p>Your Cart:</p>
            {userCart.map((item, index) => {
                return <CartItem key={index} result={item} />
            })}

        </>
    )
}

export default Cart;