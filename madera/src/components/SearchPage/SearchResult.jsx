import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { current } from "@reduxjs/toolkit";

const SearchPage = ({result}) => {

    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id

    const getCurrentCart = async () => {
        if(!user) {
            navigate('/login');
        }
        fetch(`http://localhost:3000/cart/${id}`)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response failed.");
            }
            console.log("response:", response.json());
            return response.json();
        })
        .catch(error => {
            console.error("There was a problem with fetching: ", error);
        })
    }
    
    const handleButtonClick = async () => {
        const currentCart = await getCurrentCart();
        console.log(currentCart);
        if(currentCart === undefined) {
            //No cart found, we have to make a cart.
            console.log("okay we're going to make a cart :D")
            fetch(`http://localhost:3000/cart`, {
                method: "POST",
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({id})
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Network response failed.");
                }
                console.log(response.json());
            })
            .catch(error => {
                console.error("There was a problem with fetching: ", error);
            })
        }
        console.log("cart ", currentCart);
    }

    return (
        <>
            
            <div>
                <img src={result.images[0]}/>
                <p>{result.name}</p>
                <p>${result.price.toFixed(2)}</p>
                <p>{result.description}</p>
                <button onClick={handleButtonClick}>Add To Cart</button>
            </div>
            
        </>
    )
}

export default SearchPage;