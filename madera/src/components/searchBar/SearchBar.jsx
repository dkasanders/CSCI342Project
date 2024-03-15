import React, { useState } from "react";
import "./SearchBar.css";

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
}; // step 30 Good


function SearchBar (props){ // the function takes in props 
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [sortBy, setSortBy] = useState('best_match');  // initialize the state

    const handleTermChange= (event) => { // #2
        setTerm(event.target.value);
    };

    const handleLocationChange = (event) => { //#2
        setLocation(event.target.value);
    };

    const handleSortByChange = (sortByOption) => { // #3
        setSortBy(sortByOption);
    };

    const handleSearch = (event) => { // #4 
        event.preventDefault();
        props.searchYelp(term, location, sortBy);
    }

    const getSortByClass = (sortByOption) => sortBy === sortByOption ? 'active':''; // #6

    const renderSortByOptions = () => Object.keys(sortByOptions).map((sortByOption) => {
        let sortByOptionValue = sortByOptions[sortByOption];
        return (
            <li className={getSortByClass(sortByOptionValue)}
            key = {sortByOptionValue}
            onClick={() => handleSortByChange(sortByOptionValue)}>
                {sortByOption}
            </li>
        );
    });

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