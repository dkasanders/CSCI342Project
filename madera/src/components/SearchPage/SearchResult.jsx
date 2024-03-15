import { useState } from "react";


const SearchPage = ({result}) => {


    return (
        <>
            
            <div>
                <img src={result.images[0]}/>
                <p>{result.name}</p>
                <p>${result.price.toFixed(2)}</p>
                <p>{result.description}</p>
            </div>
            
        </>
    )
}

export default SearchPage;