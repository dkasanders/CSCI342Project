import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './components/About/About.jsx';
import Login from './components/Forms/LoginForm.jsx';
import Shop from './components/Shop/Shop.jsx';
import PageNotFound from './components/NotFoundPage/PageNotFound.jsx';
import Cart from './components/Cart/Cart.jsx';
import SignupForm from './components/Forms/SignupForm.jsx'


const router = createBrowserRouter([
  {path:"/", element:<App/>},
    {path:'/about', element:<About/>},
    {path: '/login', element:<Login/>},
    {path: '/shop', element:<Shop/>},
    {path: '/cart', element:<Cart/>},
    {path: '/signup', element:<SignupForm/>},
    {path: '*', element:<PageNotFound/>}
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
