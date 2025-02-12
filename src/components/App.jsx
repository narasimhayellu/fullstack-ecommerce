import './App.css'
import React, { useContext } from 'react';
import { Route, Routes} from "react-router-dom"
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import Header from '../Header';
import { AuthContext } from '../auth/auth-context';
import PageNotFound from './page-not-found/pagenotfound';
import ProductDetails from './product_details/product_details';
import Cart from './cart/cart';

function App(){
  const {isLogin, logout} = useContext(AuthContext);
  return(
  <>
  <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/*" element={<PageNotFound/>}/>
      </Routes>
  </>
  )
}

export default App;

