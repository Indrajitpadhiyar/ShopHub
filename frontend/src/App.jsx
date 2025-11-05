import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/user.Action';
import Home from './components/pages/Home';
import AllProducts from './components/pages/AllProducts';
import ProductDetails from './components/pages/ProductDetails';
import SearchResults from './components/pages/SearchResults';
import LoginSignUp from './components/pages/LoginSignUp';
import Profile from './components/pages/Profile';
import './app.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user when app starts
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;