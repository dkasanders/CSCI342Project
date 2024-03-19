import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { current } from "@reduxjs/toolkit";

const SearchPage = ({result}) => {

    const navigate = useNavigate();
    const [imgs, updateImages] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id
    const [userCart, updateCart] = useState([]);
    const [resultImage, updateResultImage] = "";

    
    

/*
    const getCurrentCart = async () => {
        if(!user) {
            navigate('/login');
        }
        fetch(`http://localhost:3000/cart/${id}`)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response failed.");
            }
            console.log("CART response:", response.json());
            return response.json();
            updateCart(response.json());
        })
        .catch(error => {
            console.error("There was a problem with fetching cart: ", error);
        })
    }
    */
    const handleButtonClick = () => {
        if(!user) { 
            navigate('/login');
        }
        fetch(`http://localhost:3000/cart/newproduct`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: id, product: result, quantity: 1})
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response failed.");
            }
            navigate('/cart');
        })
        .catch(error => {
            console.error("There was a problem with updating cart: ", error);
        })
    }

    function matchProductImage(productName) {
        
        const matchingImage = imgs.find(image => {
            if(image.description === productName.replace(/\s+/g, '_').toLowerCase()); {
                console.log("hiii :D");
                return image;
            }
            return false
        });

        return matchingImage ? matchingImage.link : "";
    }



    useEffect(() => {
        console.log(imgs);
        matchProductImage(result.name);
    }, [imgs]);

    useEffect(() => {
        fetch("http://localhost:3000/images", { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            updateImages(data.data.images);
            //sgetuserCart()
          })
     }, []);
    

    return (
        <>
            
            <div>
                <img src={resultImage}/>
                <p>{result.name}</p>
                <p>${result.price.toFixed(2)}</p>
                <p>{result.description}</p>
                <button onClick={handleButtonClick}>Add To Cart</button>
            </div>
            
        </>
    )
}

export default SearchPage;