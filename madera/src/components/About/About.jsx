import React from "react";

/*
function About () {
    return (
        <>
        <h2>At Madera, we're passionate about transforming the timeless elegance of wood into functional and exquisite pieces that elevate your space. With a deep reverence for the natural world and a commitment to sustainable practices, we handcraft each item with precision and care.</h2>
        <p>Whether you're furnishing your home, enhancing your workspace, or seeking the perfect gift for a loved one, Madera offers a timeless selection that celebrates the enduring appeal of wood. Explore our collection today and discover the artistry of Madera – where craftsmanship meets nature's beauty.</p>
        </>
    )
}

export default About; 

*/

import MetricItem from "../MetricItem/MetricItem";
import "./About.css";
import photo from "../../assets/atlas-kadrow-Cj5LEl85meM-unsplash.jpg";
import icon from "../../assets/featured-icon.png";

const About = () => {
  return (
    <div className="about-us4">
      <h1 className="about-us5">About Us</h1>
      <div className="left-content-frame">
        <img
          className="right-content-frame"
          loading="lazy"
          alt=""
          src={photo}
        />
        <div className="newsletter-text1">
          <div className="container">
            <div className="content">
              <div className="heading-and-supporting-text">
                <div className="heading-and-icon">
                  <img
                    className="featured-icon"
                    loading="lazy"
                    alt=""
                    src={icon}
                  />
                  <h1 className="heading">
                    Wood Products from all over the globe
                  </h1>
                </div>
                <div className="supporting-text">{`Everything you need to build and create `}</div>
              </div>
            </div>
          </div>
          <div className="container1">
            <div className="content1">
              <MetricItem number="40+" />
              <img
                className="divider-icon"
                loading="lazy"
                alt=""
                src="/divider.svg"
              />
              <MetricItem number="600%" />
              <img
                className="divider-icon1"
                loading="lazy"
                alt=""
                src="/divider.svg"
              />
              <MetricItem number="4k+" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
