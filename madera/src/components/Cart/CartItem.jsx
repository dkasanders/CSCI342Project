import { useState } from "react";
import './CartItem.css';

const SearchPage = ({result}) => {


    return (
        <>
            
            <div>
                <img className="productImage" src={result.images[0]}/>
                <p>{result.name}</p>
                <p>${result.price.toFixed(2)}</p>
                <p>{result.quantity}</p>
            </div>
            
        </>
    )
}

export default SearchPage;