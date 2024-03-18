import React from "react";
import './Footer.css';

/*
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
*/

const Footer = () => {
  return (
    <section className="footer9">
      <div className="menu-frame1">
        <div className="newsletter-frame2">
          <div className="color-icon-instance1">
            <div className="enter-email-input">
              <img
                className="maderialogo-icon15"
                loading="lazy"
                alt=""
                src="../../assets/maderiaLOGO.png"
              />
            </div>
            <h1 className="madera15">MADERA</h1>
          </div>
        </div>
        <div className="register-login-text1">
          <div className="we-ara-a-container9">
            <span>{`We ara a lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat... `}</span>
            <span className="read-more9">Read More</span>
          </div>
        </div>
        <div className="contact15">
          <div className="lighttel8">
            <img className="icons25" loading="lazy" alt="" src="./phone.png" />
            <div className="text38">
              <div className="tel8">Tel</div>
              <div className="maderia-outlook-com">123-456-7890</div>
            </div>
          </div>
          <div className="lighttel8">
            <img className="icons25" loading="lazy" alt="" src="/icons-1.svg" />
            <div className="text38">
              <div className="tel8">Mail</div>
              <div className="maderia-outlook-com">maderia@outlook.com</div>
            </div>
          </div>
          <div className="lightaddress9">
            <img className="icons25" loading="lazy" alt="" src="/icons-2.svg" />
            <div className="text40">
              <div className="tel8">Address</div>
              <div className="high-st-bellingham10">
                516 High St, Bellingham, WA 98225
              </div>
            </div>
          </div>
          <div className="lightfax8">
            <img
              className="lighticon8"
              loading="lazy"
              alt=""
              src="/lighticon.svg"
            />
            <div className="text38">
              <div className="tel8">Fax</div>
              <div className="maderia-outlook-com">+1-000-0000</div>
            </div>
          </div>
        </div>
      </div>
      <div className="newsletter8">
        <div className="menu4">
          <div className="newsletter9">Newsletter</div>
          <div className="be-the-first4">
            Be the first one to know about discounts, offers and events
          </div>
        </div>
        <div className="colornewsletter4">
          <img
            className="coloricon4"
            loading="lazy"
            alt=""
            src="/coloricon.svg"
          />
          <div className="enter-your-email4">Enter your email</div>
          <div className="right4">
            <button className="colorbutton4">
              <div className="register-login4">Submit</div>
            </button>
          </div>
        </div>
      </div>
      <div className="bottombar6">
        <div className="shop12">Shop</div>
        <div className="shop12">About US</div>
        <div className="cart11">Cart</div>
      </div>
    </section>
  );
};

export default Footer;