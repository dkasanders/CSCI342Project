import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import About from './components/About/About'
import Categories from './components/Categories/Categories'
import {Link, Outlet} from 'react-router-dom'

import backgroundImage from './assets/background_image.png';
import Product from './components/Product/Product'


function App() {
  const [count, setCount] = useState(0)

    /*
  return (
    <div className="app">
      <Header />
      <Outlet/>
      <About/>
      <Footer/>
    </div>
  )
  */

  const dummyData = {
    'name': "Wood Chair",
    'description': "Really good wooden chair.",
    'category': "wood",
    'images' : [{data: 'hmm', 'type': 'hmmm'}],
    'price': 100,
    'inventory': 3
  };
 return (
  <Product productData={dummyData}/>
 )
}

export default App
