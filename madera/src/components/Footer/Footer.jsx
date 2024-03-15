import React from "react";
import './Footer.css';

function Footer() {
    return (
        <>
        <div>
            <ul className="contact-list">
                <li className="list-component">Phone: 360-555-5555</li>
                <li className="list-component">Mail: info@website.com</li>
                <li className="list-component">Address: 123 Main Street. Bellingham, WA 98225</li>
                <li className="list-component">Fax: +1-000-0000</li>
            </ul>
        </div>
        <div className="newsletter">
            <b>Newsletter</b>
            <p>Be the first one to know about discounts, offers, and events</p>
            <input type="email"></input>
        </div>
        
        </>
    )
}


export default Footer;

