import React from "react";
import './PageNotFound.css';
import { Link } from "react-router-dom";


const PageNotFound = () => (

    <>
        <div className="PageNotFound">
            <div className="scene">
                <div className="text"><h2>404</h2></div>
                <div className="text"><h3>Page Not Found!</h3></div>
                <div className="text"><p>Sorry, we couldn't find the page you're looking for.</p></div>

                <br />
                <br />
                <br />
                <a className="cta-btn" href="/">Go to Home</a>
            </div>
        </div>
    </>
);
export default PageNotFound;