import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import LoginPage from './components/pages/LoginPage';
import Loader from './components/layouts/Loader';
import RegisterPage from './components/pages/RegisterPage ';
import ProductDitails from './components/pages/ProductDitails';
import AllProduct from './components/pages/AllProduct';
// import ErrorBoundary from "./components/errors/ErrorBoundary.jsx";
import AddToCart from './components/pages/AddToCart.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import './app.css';

const App = () => {
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