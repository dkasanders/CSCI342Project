import React from "react";
import { useState, useEffect } from "react";


function Categories() {

    
    const [results, updateResults] = useState([])
    const [categories, updateCategories] = useState([]);
    const [productsByCat, updateProductsByCat] = useState([]);


    //takes data from products/all port and converts into a list sorting by category
    const sortByCategory = (data) => {
        const categorylist = []
        data.forEach((result) => {
            result.categories.forEach((category) => {
                if(!categorylist.includes(category.category)) {
                    categorylist.push(category.category);
                } 
            });
        });
        updateCategories(categorylist);
    }
   

    const productsByCategory = (data) => {
        const products = {};
        data.forEach((result) => {
            result.categories.forEach((category) => {
                if(!products[category.category]) {
                    products[category.category] = [];
                }
                products[category.category].push(result);
            })
        })
        updateProductsByCat(products);
    }

    useEffect(() => {
        fetch('http://localhost:3000/product/all', {
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
    }, [])
    
    useEffect(() => {
        sortByCategory(results);
    }, [results]);

    useEffect(() => {
        productsByCategory(results);
    },[categories]);

    return (
        <ul>
            {categories.map((category, index) => (
                <li key={index}>{category}</li>
                
            ))}
        </ul>
    )
}

export default Categories;