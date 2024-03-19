import React from "react";
import { useParams } from "react-router-dom";
import "./item.css";

function Item(product) {
    let { itemId } = useParams();
    // For the sake of example, let's assume we have a function to fetch item details by ID
    


   

    return (
        <div className="item">
            <h2>Item Details</h2>
            <p>ID: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Description: {product.description}</p>
            {/* Render images */}
            <div className="itemimg-icon">
                {product.images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} />
                ))}
            </div>
        </div>
    );
}

export default Item;
