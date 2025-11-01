import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, Home, Grid, Tag, Heart } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, path: '/' },
        { id: 'products', label: 'All Products', icon: Grid, path: '/products' },
        { id: 'deals', label: 'Hot Deals', icon: Tag, path: '/deals' },
        { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist' },
    ];

    const handleNavClick = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const currentPath = window.location.pathname;

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* LOGO - Simple Fade + Slide */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                            <img src="/bagifyLogo.png" alt="Bagify" className="w-full h-full rounded-full" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                            Bagify
                        </span>
                    </motion.div>

                    {/* SEARCH BAR - Fade In */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden md:flex flex-1 max-w-2xl mx-8"
                    >
                        <div className="relative w-full group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                placeholder="Search for products..."
                                className="w-full px-6 py-3 pl-12 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center space-x-4">

                        {/* CART - Gentle Scale */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/cart')}
                            className="relative p-2 hover:bg-orange-50 rounded-full transition-all duration-300"
                        >
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                3
                            </span>
                        </motion.button>

                        {/* LOGIN / PROFILE */}
                        <AnimatePresence mode="wait">
                            {isLoggedIn ? (
                                <motion.button
                                    key="profile"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleLogin}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://ui-avatars.com/api/?name=John+Doe&background=f97316&color=fff"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="hidden sm:inline font-medium">John</span>
                                </motion.button>
                            ) : (
                                <motion.button
                                    key="login"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/login')}
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
                                >
                                    Login
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* MOBILE MENU TOGGLE */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* DESKTOP NAV - Staggered Fade In */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="hidden md:flex items-center justify-center space-x-2 pb-4"
                >
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = currentPath === item.path;

                        return (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.4 }}
                                whileHover={{ y: -2 }}
                                onClick={() => handleNavClick(item.path)}
                                className="relative px-6 py-2.5 rounded-full transition-all duration-300 group overflow-hidden"
                            >
                                <div
                                    className={`absolute inset-0 rounded-full transition-all duration-500 ${isActive
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 scale-100 opacity-100'
                                        : 'bg-orange-100 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                                        }`}
                                />
                                <div className="relative flex items-center space-x-2">
                                    <Icon
                                        className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-orange-600'
                                            }`}
                                    />
                                    <span
                                        className={`font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-orange-600'
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* MOBILE SEARCH - Fade In */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="md:hidden pb-4"
                >
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search products..."
                            className="w-full px-4 py-2 pl-10 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-all duration-300"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                </motion.div>
            </div>

            {/* MOBILE MENU - Smooth Slide Down */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-2 bg-gradient-to-b from-white to-orange-50">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = currentPath === item.path;

                                return (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ x: 5 }}
                                        onClick={() => handleNavClick(item.path)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                                            : 'bg-white text-gray-700 hover:bg-orange-50 hover:scale-102'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;