import React, { useState } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";



const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
}; // step 30 Good


function SearchBar (props){ // the function takes in props 
    const [term, setTerm] = useState('');
    

    const handleTermChange= (event) => { // #2
        setTerm(event.target.value);
    };

   

    const handleSearch = (event) => { // #4 
        window.location.href ='/search';
    }

  

   

    return (
        <div className="SearchBar">
            <div className="SearchBar-sort-options">
               
            </div>
            <div className="SearchBar-fields">
                <input placeholder="Search" onChange={handleTermChange}/>
            </div>
            <div className="SearchBar-submit">
                <button onClick={handleSearch}>Let's Go</button>
            </div>
        </div>
    );
}
export default SearchBar;