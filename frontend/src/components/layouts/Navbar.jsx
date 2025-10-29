import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User, Package, Home, Grid, Tag, Heart } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'products', label: 'All Products', icon: Grid },
        { id: 'deals', label: 'Hot Deals', icon: Tag },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
    ];

    const handleNavClick = (itemId) => {
        setActiveSection(itemId);
    };

    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            {/* Main Navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                            <img src="/bagifyLogo.png" alt="" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                            Bagify
                        </span>
                    </div>

                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <div className="relative w-full group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full px-6 py-3 pl-12 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        </div>
                    </div>

                    {/* Right Side - Cart and Profile */}
                    <div className="flex items-center space-x-4">
                        {/* Cart Icon */}
                        <button className="relative p-2 hover:bg-orange-50 rounded-full transition-all duration-300 hover:scale-110">
                            <ShoppingCart className="w-6 h-6 text-gray-700" />
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                3
                            </span>
                        </button>

                        {/* Profile/Login */}
                        {isLoggedIn ? (
                            <button
                                onClick={toggleLogin}
                                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://ui-avatars.com/api/?name=John+Doe&background=f97316&color=fff"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="hidden sm:inline font-medium">John</span>
                            </button>
                        ) : (
                            <button
                                onClick={toggleLogin}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
                            >
                                Login
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation Items */}
                <div className="hidden md:flex items-center justify-center space-x-2 pb-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className="relative px-6 py-2.5 rounded-full transition-all duration-300 group overflow-hidden"
                            >
                                {/* Bubble Effect Background */}
                                <div
                                    className={`absolute inset-0 rounded-full transition-all duration-500 ${isActive
                                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 scale-100 opacity-100'
                                            : 'bg-orange-100 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                                        }`}
                                />

                                {/* Content */}
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

                                {/* Active Indicator Dot */}
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden pb-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="w-full px-4 py-2 pl-10 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-all duration-300"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pb-4 space-y-2 bg-gradient-to-b from-white to-orange-50">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    handleNavClick(item.id);
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-orange-50 hover:scale-102'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;