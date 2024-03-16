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
    
    // const getUserId = () => {
    //     console.log(localStorage.)
    //     return JSON.parse(localStorage.getItem('user')).id;
    // }
    const [userCart, updateuserCart] = useState(dummyData)
    const { user } = useSelector((state) => state.auth);
    console.log(user)


    function matchProductImage(productName) {
        console.log(imgs)
        const matchingImage = imgs.find(image => {
            return image.description === productName.replace(/\s+/g, '_').toLowerCase();
        });
        return matchingImage.link
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