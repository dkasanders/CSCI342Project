import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchResult from "../SearchPage/SearchResult";
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

    const url = 'http://localhost:3000/product/all';
    const [results, updateResults] = useState([])

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
    })

    return (
        <div>
            <h2>Shop Page</h2>
            <div>
                    <h2>All Products</h2>
                    {results.map((result, index) => {
                        return <SearchResult key={index} result={result}/>
                    })}
                </div>
        </div>
    );
}

export default Shop;
