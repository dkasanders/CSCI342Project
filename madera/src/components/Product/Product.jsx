import React from "react";

import { useState } from "react";

const Product = ({ productData }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    }


    

    //Where the image variable is a url to the image 
    const [image, updateImage] = useState('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.blenderkit.com%2Fasset-gallery-detail%2Fad4141e8-7828-4196-a4e1-c98bb9890efd%2F&psig=AOvVaw2gQqGbeArrGbC7smrbBUMx&ust=1710607414695000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKDu-Kvb9oQDFQAAAAAdAAAAABAK')

    //Not too sure how the image buffer is supposed to work. But you should use these two values from the schema in order to get the image.
    const imageData = productData.images[0].data;
    const imageType = productData.images[0].type;

   
    //const imageUrl;
    //updateImage(imageUrl);

   

    return (
        <div>
            <div className="">
                <img src={image} />
                <h2>Product Name: {productData.name}</h2>
                <input type="number" min="1" value={quantity} onChange={handleQuantityChange}/>
                <button>Add To Cart</button>
            </div>
            <div>
                <p>Product Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
                <p>Dimensions: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
            </div>
            
        </div>

    );
}

export default Product;