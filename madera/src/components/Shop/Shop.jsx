import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchResult from "../SearchPage/SearchResult";
import "./shop.css";
import image1 from "./image1.png";

function Shop() {
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
            images: ["image2.jpg"]
        },
        {
            id: 3,
            name: "Item 3",
            price: 20.99,
            description: "Description of Item 3",
            images: ["image3.jpg"]
        }
    ];

    const url = 'http://localhost:3000/product/all';
    const [results, updateResults] = useState([]);

    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response failed.");
            }
            return response.json();
        })
        .then(data => {
            updateResults(data);
        })
        .catch(error => {
            console.error("There was a problem with fetching: ", error);
        });
    }, []); // Empty dependency array to run effect only once on component mount

    return (
        <div>
            <h2>Shop Page</h2>
            <div>
                <h2>All Products</h2>
                {/* Render the first item */}
                {items.slice(0, 1).map((item) => (
                    <div key={item.id}>
                         <Link to={`/item/${item.id}`}>
                            <img src={item.images[0]} alt={item.name} />
                        </Link>
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price.toFixed(2)}</p>
                        <p>Description: {item.description}</p>
                        {/* Link the first item's image to the item page */}
                    </div>
                ))}
                {/* Render the rest of the items fetched from API */}
                {results.map((result, index) => (
                    <SearchResult key={index} result={result}/>
                ))}
            </div>
        </div>
    );
}

export default Shop;
