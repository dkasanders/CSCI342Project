import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import CartItem from './CartItem';
import { useState } from "react";
import { useSelector } from "react-redux"; 
//import { find } from "@reduxjs/toolkit/dist/utils";
function Cart() {
    const [imgs, updateImages] = useState([]);
    
    
    // const getUserId = () => {
    //     console.log(localStorage.)
    //     return JSON.parse(localStorage.getItem('user')).id;
    // }
    const [userCart, updateuserCart] = useState([])
    const { user } = useSelector((state) => state.auth);
    console.log(user)


    function matchProductImage(productName) {
        console.log(imgs)
        const matchingImage = imgs.find(image => {
            return image.description === productName.replace(/\s+/g, '_').toLowerCase();
        });
        return matchingImage.link
    }


    const getuserCart = () => {

        //api pull... 
        //updateuserCart
        fetch(`http://localhost:3000/cart/${user.id}`, { 
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            const updatedCart = data.products.map(product => {

                return {
                    name: product.name,
                    price: product.price, // Assuming price is available directly in product
                    quantity: product.quantity, // Assuming quantity is available directly in product
                    images: [matchProductImage(product.name)] // Assuming images is an array of URLs
                };
            });
            console.log(updatedCart)
            updateuserCart(updatedCart);
          })
    }

    React.useEffect(() => {
        console.log(imgs)
        getuserCart()
    }, [imgs]);

    React.useEffect(() => {
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
            <p>Your Cart:</p>
            {userCart.map((item, index) => {
                return <CartItem key={index} result={item} />
            })}

        </>
    )
}

export default Cart;
