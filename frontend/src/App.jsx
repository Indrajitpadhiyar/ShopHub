import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import LoginPage from './components/pages/LoginPage';
import Loader from './components/layouts/Loader';
import RegisterPage from './components/pages/RegisterPage ';
import ProductDitails from './components/pages/ProductDitails';
import AllProduct from './components/pages/AllProduct';
// import AddToCart from "./components/pages/AddToCart";
import Cart from './components/ui/Cart';
import './app.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loader />} />
        <Route path="/product/:id" element={<ProductDitails />} />
        <Route path="/Allproducts" element={<AllProduct />} />
        <Route path="/AddToCart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;