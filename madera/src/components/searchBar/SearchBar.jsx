import React, { useState } from "react";
import "./SearchBar.css";
import { Link, useNavigate} from "react-router-dom";





function SearchBar (props){ 
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleTermChange= (event) => { 
        setTerm(event.target.value);
    };

   

    const handleSearch = (event) => { 
        navigate(`/search?searchKey=${term}`);
    }

  

   

    return (
        <div className="SearchBar">
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