import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Home from './components/pages/Home';
import LoginPage from './components/pages/LoginPage';
import Loader from './components/layouts/Loader';
import RegisterPage from './components/pages/RegisterPage ';
import ProductDitails from './components/pages/ProductDitails';
import AllProduct from './components/pages/AllProduct';
import AddToCart from './components/pages/AddToCart.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import { loadUser } from "./actions/user.action";
import './app.css';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    // <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loader />} />
        <Route path="/product/:id" element={<ProductDitails />} />
        <Route path="/Allproducts" element={<AllProduct />} />
        <Route path="/AddToCart" element={<AddToCart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
    // </ErrorBoundary >
  );
};

export default App;