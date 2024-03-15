import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import About from './components/About/About'
import Categories from './components/Categories/Categories'
import {Link, Outlet} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Outlet/>
      <About/>
      <Footer/>
    </>
  )
}

export default App
