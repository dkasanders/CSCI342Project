import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchResult from "../SearchPage/SearchResult";
import "./shop.css"



function Shop() {    

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
