'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, X, Filter, ShoppingBag } from 'lucide-react';
import { useSelector } from 'react-redux';

const Sidebar = ({ isOpen, onClose, filters, setFilters }) => {
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        price: true,
        brands: true,
    });

    // Get unique categories from products (backend data)
    const { products } = useSelector((state) => state.products);
    const [availableCategories, setAvailableCategories] = useState([]);

    useEffect(() => {
        if (Array.isArray(products) && products.length > 0) {
            // Extract unique categories from products
            const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
            setAvailableCategories(categories);
        }
    }, [products]);

    const brands = [
        'Bagify Original', 'Luxury Line', 'Urban Carry', 'EcoBag', 'TravelPro', 'MiniPurse'
    ];

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleCategoryChange = (cat) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    const handleBrandChange = (brand) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [...prev.brands, brand]
        }));
    };

    const applyCustomPrice = () => {
        const min = parseInt(filters.customMin) || 0;
        const max = parseInt(filters.customMax) || 1000000;
        setFilters(prev => ({
            ...prev,
            priceRange: [min, max],
            customMin: '',
            customMax: ''
        }));
    };

    const clearAllFilters = () => {
        setFilters({
            categories: [],
            brands: [],
            priceRange: [0, 1000000],
            customMin: '',
            customMax: '',
        });
    };

    const removeFilter = (type, value) => {
        if (type === 'category') {
            handleCategoryChange(value);
        } else if (type === 'brand') {
            handleBrandChange(value);
        }
    };

    const activeFiltersCount = filters.categories.length + filters.brands.length;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed lg:sticky top-0 left-0 h-screen bg-white shadow-2xl lg:shadow-lg transition-all duration-300 ease-in-out z-40 flex flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                w-80 lg:w-72`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 lg:p-5 border-b bg-gradient-to-r from-orange-50 to-orange-100">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-orange-600" />
                        <h2 className="font-bold text-xl text-gray-800">Filters</h2>
                        {activeFiltersCount > 0 && (
                            <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {activeFiltersCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 hover:bg-orange-200 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-6">
                    {/* Clear All - Only show when filters are active */}
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="w-full text-orange-600 text-sm font-semibold hover:bg-orange-50 py-2 rounded-lg transition-colors"
                        >
                            Clear All Filters
                        </button>
                    )}

                    {/* Categories - Dynamic from Backend */}
                    <div className="border-b pb-4">
                        <button
                            onClick={() => toggleSection('categories')}
                            className="w-full flex items-center justify-between mb-3 group"
                        >
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4 text-orange-600" />
                                Categories
                            </h3>
                            {expandedSections.categories ? (
                                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-colors" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-colors" />
                            )}
                        </button>
                        {expandedSections.categories && (
                            <div className="space-y-2">
                                {availableCategories.length > 0 ? (
                                    availableCategories.map(cat => (
                                        <label key={cat} className="flex items-center space-x-3 cursor-pointer group hover:bg-orange-50 p-2 rounded-lg transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={filters.categories.includes(cat)}
                                                onChange={() => handleCategoryChange(cat)}
                                                className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer"
                                            />
                                            <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors capitalize">
                                                {cat}
                                            </span>
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-2">No categories available</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    <div className="border-b pb-4">
                        <button
                            onClick={() => toggleSection('price')}
                            className="w-full flex items-center justify-between mb-3 group"
                        >
                            <h3 className="font-semibold text-gray-800">Price Range</h3>
                            {expandedSections.price ? (
                                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-colors" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-colors" />
                            )}
                        </button>
                        {expandedSections.price && (
                            <div className="space-y-4">
                                <div className="px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                                        }))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                    />
                                    <div className="flex justify-between mt-2 text-sm font-medium text-gray-600">
                                        <span>₹{filters.priceRange[0]}</span>
                                        <span>₹{filters.priceRange[1]}</span>
                                    </div>
                                </div>

                                {/* Custom Price Input */}
                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-xl border border-orange-200">
                                    <h4 className="font-medium text-gray-700 mb-2 text-sm">Custom Range</h4>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.customMin}
                                            onChange={(e) => setFilters(prev => ({ ...prev, customMin: e.target.value }))}
                                            className="w-full px-3 py-2 text-sm border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.customMax}
                                            onChange={(e) => setFilters(prev => ({ ...prev, customMax: e.target.value }))}
                                            className="w-full px-3 py-2 text-sm border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                    <button
                                        onClick={applyCustomPrice}
                                        className="mt-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-medium text-sm hover:shadow-lg hover:scale-105 transition-all"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Brands */}
                    <div>
                        <button
                            onClick={() => toggleSection('brands')}
                            className="w-full flex items-center justify-between mb-3 group"
                        >
                            <h3 className="font-semibold text-gray-800">Brands</h3>
                            {expandedSections.brands ? (
                                <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-colors" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-orange-600 transition-colors" />
                            )}
                        </button>
                        {expandedSections.brands && (
                            <div className="space-y-2">
                                {brands.map(brand => (
                                    <label key={brand} className="flex items-center space-x-3 cursor-pointer group hover:bg-orange-50 p-2 rounded-lg transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={filters.brands.includes(brand)}
                                            onChange={() => handleBrandChange(brand)}
                                            className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500 cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                                            {brand}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Active Filters Summary - Only show when filters are active */}
                {activeFiltersCount > 0 && (
                    <div className="border-t bg-gray-50 p-4">
                        <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Active Filters</p>
                        <div className="flex flex-wrap gap-2">
                            {filters.categories.map(cat => (
                                <span key={cat} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 capitalize">
                                    {cat}
                                    <button onClick={() => removeFilter('category', cat)} className="hover:bg-orange-200 rounded-full p-0.5">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            {filters.brands.map(brand => (
                                <span key={brand} className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    {brand}
                                    <button onClick={() => removeFilter('brand', brand)} className="hover:bg-teal-200 rounded-full p-0.5">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Sidebar;