import { useState } from "react";
import SearchResult from "./SearchResult";

const SearchPage = ({searchKey}) => {

    /* API pull currently uses the ID of the product,
    * if we're searching by keyword it will return an array
    */

    const [results, updateResults] = useState([])
    const isEmpty = (searchKey.trim() === '');
    let url = "";

    if(isEmpty) {
        url = 'http://localhost:3000/product/all';
    } else {
        url = `http://localhost:3000/product/byname/${searchKey}`;
    }
    fetch(url, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
        if (!response.ok) {
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
            {isEmpty? (
                <div>
                    <h2>All Products</h2>
                    {results.map((result, index) => {
                        return <SearchResult key={index} result={result}/>
                    })}
                </div>
            ) : (
                <div>
                {results.length === 0 ? (
                    <h2>No Results Found for "{searchKey}"</h2>
                ) : (
                    <div>
                        <h2>Results for "{searchKey}"</h2>
                        {results.map((result, index) => {
                            return <SearchResult key={index} result={result}/>
                        })}
                    </div>
                )}
                </div>
            )}
        
        </div>
    )
}

export default SearchPage;