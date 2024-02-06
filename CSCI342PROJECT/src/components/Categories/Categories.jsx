import React from "react";

const categoryList = ['Category 1', 'Category 2', 'Category 3']

function Categories() {
    return (
        <ul>
            {categoryList.map((category, index) => (
                <li key={index}>{category}</li>
            ))}
        </ul>
    )
}

export default Categories;