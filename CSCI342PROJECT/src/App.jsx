import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from './components/Header/Header'
import About from './components/About/About'
import Categories from './components/Categories/Categories'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Categories />
      <About/>
    </>
  )
}

export default App
