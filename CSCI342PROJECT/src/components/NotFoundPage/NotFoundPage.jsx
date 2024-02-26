import React from "react";

import { Link } from "react-router-dom";


function NotFoundPage() {
    return (
        <>
        <h1>Oops!</h1>
        <p>The page you are trying to reach is not found, <Link to='/'>click here</Link> to go back to the homepage</p>
        </>
    )
}
export default NotFoundPage