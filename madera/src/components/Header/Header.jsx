import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD

import logo from '../../assets/logo.png';

import './Header.css'
=======
import SearchBar from '../searchBar/SearchBar'
import './../../index.css'
>>>>>>> group

function Header() {

    return (
<<<<<<< HEAD
        <div className={`flex justify-between items-center py-4 px-8`}>
            <div className={`flex items-center`}>
                <img className={`h-8  mr-2`} alt="Logo" src={logo} />
                <Link to="/" className={`text-lg font-semibold text-white text-black outline-black hover:text-gray-600`}><h1>MADERIA</h1></Link>
            </div>
            <div className="">
                <div className={`flex space-x-4`}>
                    <Link to="/shop" className={`text-gray-800 hover:text-gray-600`}>Shop</Link>
                    <Link to="/about" className={`text-gray-800 hover:text-gray-600`}>About Us</Link>
                    <Link to="/cart" className={`text-gray-800 hover:text-gray-600`}>Cart</Link>
                </div>
            </div>    
            <div>
                <Link to="/login" className={`text-gray-800 hover:text-gray-600`}>Login</Link>
            </div>
=======
        <div>
            <h1><Link to="/">Madera</Link></h1>
            <SearchBar/>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
>>>>>>> group
        </div>
    )
}

export default Header; 

/*const Header = () => {
    return (
      <section className={`self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[100px] box-border max-w-full text-left text-45xl text-shades-white font-piazzolla lg:pb-[65px] lg:box-border mq750:pb-[42px] mq750:box-border`}>
        <div className={`flex-1 bg-shades-white overflow-hidden flex flex-row items-start justify-start relative max-w-full`}>
          <img
            className={`h-[1356px] w-[2033px] absolute !m-[0] bottom-[-332px] left-[-297px] object-cover`}
            alt=""
            src="/taijyunchangap6bazcbahounsplash-1@2x.png"
          />
          <header className={`h-[422px] flex-[0.8889] flex flex-row items-start justify-start py-[43px] px-20 box-border relative max-w-full ml-[-1440px] mq750:pl-10 mq750:pr-10 mq750:box-border`}>
            <div className={`h-full w-[1453px] absolute !m-[0] top-[422px] right-[-1466px] bottom-[-422px] [background:linear-gradient(0deg,_#202020,_rgba(32,_32,_32,_0))] [transform:_rotate(-180deg)] [transform-origin:0_0] z-[1]`} />
            <nav className={`m-0 flex-1 flex flex-row items-start justify-between max-w-full gap-[40px] z-[3] text-left text-base text-lavender font-body-medium-regular`}>
              <div className={`h-[75px] w-[383.5px] relative max-w-full text-right text-17xl text-shades-white font-pro`}>
                <img
                  className={`absolute h-full top-[0px] bottom-[0px] left-[0px] rounded-3xs max-h-full w-[75px] object-cover`}
                  loading="lazy"
                  alt=""
                  src="/maderialogo@2x.png"
                />
                <h1 className={`m-0 absolute top-[14px] left-[56px] text-inherit font-normal font-inherit inline-block w-[223px] h-[47px] [text-shadow:0px_4px_4px_rgba(0,_0,_0,_0.25)] whitespace-nowrap`}>
                  MADERA
                </h1>
              </div>
              <div className={`flex flex-row items-center justify-start gap-[40px]`}>
                <button className={`cursor-pointer relative leading-[155%] font-semibold`}>
                  Shop
                </button>
                <button className={`cursor-pointer relative leading-[160%] whitespace-nowrap`}>
                  About Us
                </button>
                <button className={`cursor-pointer relative leading-[160%]`}>
                  Cart
                </button>
                <a href="/login" className={`cursor-pointer [border:none] py-[13.5px] px-[59px] bg-mediumseagreen self-stretch rounded-31xl shadow-[0px_1px_2px_rgba(13,_13,_18,_0.06)] flex flex-row items-start justify-start hover:bg-seagreen`}>
                  <div className={`flex-1 relative text-base leading-[155%] font-semibold font-body-medium-regular text-shades-white text-center`}>
                    Login
                  </div>
                </a>
              </div>
            </nav>
          </header>
        </div>
          <div className={`flex-1 flex flex-col items-start justify-start pt-[582px] px-0 pb-0 box-border max-w-full mq750:pt-[246px] mq750:box-border mq1050:pt-[378px] mq1050:box-border`}>
            <div className={`self-stretch [background:linear-gradient(0deg,_#202020,_rgba(32,_32,_32,_0))] flex flex-col items-start justify-start pt-[75px] px-[98px] pb-[123px] box-border gap-[16px] max-w-full z-[1] mq450:pt-[49px] mq450:px-5 mq450:pb-20 mq450:box-border mq1050:pl-[49px] mq1050:pr-[49px] mq1050:box-border`}>
              <div className={`w-[1453px] h-[442px] relative [background:linear-gradient(0deg,_#202020,_rgba(32,_32,_32,_0))] hidden max-w-full`} />
              <h1 className={`m-0 w-[656px] h-[91px] relative text-inherit font-bold font-inherit inline-block max-w-full z-[2] mq450:text-19xl mq1050:text-32xl`}>
                Madera Wood Products
              </h1>
              <div className={`w-[590px] h-[137px] relative text-xl tracking-[-0.01em] font-light font-smallpoppins text-greyscale-25 inline-block shrink-0 max-w-full z-[2] mq450:text-base`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </div>
            </div>
          </div>
          
      </section>
    );
  };
  
  export default Header;*/
  