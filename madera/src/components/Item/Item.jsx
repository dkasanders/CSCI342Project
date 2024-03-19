import React from "react";
import { useParams } from "react-router-dom";
import "./item.css";
import image1 from "../Shop/image1.png";

function Item() {
    let { itemId } = useParams();
    // For the sake of example, let's assume we have a function to fetch item details by ID
    const fetchItemDetails = (itemId) => {
        // Mock data for demonstration
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
        
        // Find the item with the given ID
        return items.find(item => item.id == itemId);
    };

    const item = fetchItemDetails(itemId);

    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div className="item">
            <div className="itemimg-icon">
                {item.images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} />
                ))}
            </div>
            <h2>Item Details</h2>
            <p>ID: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Description: {item.description}</p>
            {/* Render images */}
            
        </div>
    );
}

export default Item;
