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
import SearchPage from './components/SearchPage/SearchPage.jsx';
import Categories from './components/Categories/Categories.jsx';
import {createRoutesFromElements, Route } from 'react-router-dom';
import Orders from './components/Orders/Orders.jsx';
import { Provider } from 'react-redux';
import store from './components/store/store.jsx'
import Account from './components/Account/Account.jsx';


/*const router = createBrowserRouter([
  {path:"/", element:<App/>},
    {path:'/about', element:<About/>},
    {path: '/login', element:<Login/>},
    {path: '/shop', element:<Shop/>},
    {path: '/cart', element:<Cart/>},
    {path: '/signup', element:<SignupForm/>},
    {path: '/search', element:<SearchPage searchKey="Acacia Wood"/>},
    {path: '*', element:<PageNotFound/>}
])*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route element={<App />}>
      <Route path="/" element={<Categories />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      {/* Use the ProtectedRoute for routes that require authentication */}
      <Route path="*" element={<PageNotFound />} />
      <Route path= "/search" element={<SearchPage searchKey=""/>}/> <Route/>
      <Route path= "/cart" element={<Cart/>}/> <Route/>
      <Route path="/orders" element={<Orders/>}/><Route/>
      <Route path="/account" element={<Account/>}/><Route/>
      <Route path="/shop" element={<Shop/>}/><Route/>
    </Route>
    </Route>
  )
);



/*ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
