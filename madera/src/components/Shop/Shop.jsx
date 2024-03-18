import React from "react";
import { Link } from "react-router-dom";
import "./shop.css"
import image1 from "./image1.png";



function Shop() {
    // Array of items with their details
    const items = [
        {
            id: 1,
            name: "Item 1",
            price: 10.99,
            description: "Description of Item 1",
            images: [image1]
        },
        {
            id: 2,
            name: "Item 2",
            price: 15.99,
            description: "Description of Item 2",
            images: [image1]
        },
        {
            id: 3,
            name: "Item 3",
            price: 0.00,
            description: "Description of Item 3",
            images: [image1]
        }
    ];

    return (
        <div>
            <h2>Shop Page</h2>
            {/* Map over the items array to render each item */}
            {items.map(item => (
                <div key={item.id}>
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Description: {item.description}</p>
                    {/* Render images */}
                    <div>
                        {item.images.map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index}`} />
                        ))}
                    </div>
                    {/* Link to item page with item ID as parameter */}
                    <Link to={`/item/${item.id}`}>View Item</Link>
                </div>
            ))}
        </div>
    );
}

export default Shop;
