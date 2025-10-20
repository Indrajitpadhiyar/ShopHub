import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, ChevronDown, DollarSign, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const FilterSidebar = ({
    categories,
    onFilterChange,
    selectedCategory,
    priceRange,
    minPrice = 0,
    maxPrice = 50000
}) => {
    const [customMin, setCustomMin] = useState(priceRange[0]);
    const [customMax, setCustomMax] = useState(priceRange[1]);
    const [showCustomPrice, setShowCustomPrice] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
    });

    useEffect(() => {
        setCustomMin(priceRange[0]);
        setCustomMax(priceRange[1]);
    }, [priceRange]);

    const priceRanges = [
        { label: 'All Prices', min: minPrice, max: maxPrice },
        { label: 'Under ₹1,000', min: minPrice, max: 1000 },
        { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
        { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
        { label: 'Above ₹10,000', min: 10000, max: maxPrice },
    ];

    const handleCategoryChange = (category) => {
        onFilterChange({ category, priceRange });
    };

    const handlePriceRangeChange = (min, max) => {
        onFilterChange({ category: selectedCategory, priceRange: [min, max] });
        setShowCustomPrice(false);
    };

    const handleCustomPriceApply = () => {
        const min = Math.max(minPrice, parseInt(customMin) || minPrice);
        const max = Math.min(maxPrice, parseInt(customMax) || maxPrice);
        if (min <= max) {
            onFilterChange({ category: selectedCategory, priceRange: [min, max] });
        } else {
            toast.error("Minimum price should be less than maximum price");
        }
    };

    const handleReset = () => {
        onFilterChange({ category: 'all', priceRange: [minPrice, maxPrice] });
        setCustomMin(minPrice);
        setCustomMax(maxPrice);
        setShowCustomPrice(false);
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 h-fit"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="flex items-center gap-3"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg"
                    >
                    </motion.div>
                    <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                </motion.div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleReset}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                    Reset
                </motion.button>
            </div>

            {/* Category Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
            >
                <button
                    onClick={() => toggleSection('category')}
                    className="flex items-center justify-between w-full mb-3"
                >
                    <div className="flex items-center gap-2">
                        <Tag className="text-purple-600" size={18} />
                        <h3 className="text-base font-semibold text-gray-800">Category</h3>
                    </div>
                    <motion.div
                        animate={{ rotate: expandedSections.category ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown size={18} />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {expandedSections.category && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category, index) => (
                                    <motion.button
                                        key={category}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${selectedCategory === category
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Price Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full mb-3"
                >
                    <div className="flex items-center gap-2">
                        <DollarSign className="text-green-600" size={18} />
                        <h3 className="text-base font-semibold text-gray-800">Price Range</h3>
                    </div>
                    <motion.div
                        animate={{ rotate: expandedSections.price ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown size={18} />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {expandedSections.price && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden space-y-3"
                        >
                            {/* Current Range Display */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl border-2 border-blue-200"
                            >
                                <p className="text-xs text-gray-600 mb-1">Selected Range:</p>
                                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                                </p>
                            </motion.div>

                            {/* Preset Price Ranges */}
                            <div className="space-y-2">
                                {priceRanges.map((range, index) => (
                                    <motion.button
                                        key={range.label}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handlePriceRangeChange(range.min, range.max)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm ${priceRange[0] === range.min && priceRange[1] === range.max
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                            : 'bg-white border-2 border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        {range.label}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Custom Price Range */}
                            <motion.div className="pt-3 border-t-2 border-gray-200">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowCustomPrice(!showCustomPrice)}
                                    className="w-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-between hover:shadow-md transition-all duration-300"
                                >
                                    <span>Custom Price Range</span>
                                    <motion.div
                                        animate={{ rotate: showCustomPrice ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={16} />
                                    </motion.div>
                                </motion.button>

                                <AnimatePresence>
                                    {showCustomPrice && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, y: -10 }}
                                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                                            exit={{ height: 0, opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-3 space-y-3 overflow-hidden"
                                        >
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                                    Minimum Price
                                                </label>
                                                <motion.input
                                                    initial={{ x: -20 }}
                                                    animate={{ x: 0 }}
                                                    type="number"
                                                    value={customMin}
                                                    onChange={(e) => setCustomMin(e.target.value)}
                                                    className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200"
                                                    placeholder="Min Price"
                                                    min={minPrice}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                                    Maximum Price
                                                </label>
                                                <motion.input
                                                    initial={{ x: -20 }}
                                                    animate={{ x: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                    type="number"
                                                    value={customMax}
                                                    onChange={(e) => setCustomMax(e.target.value)}
                                                    className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200"
                                                    placeholder="Max Price"
                                                    max={maxPrice}
                                                />
                                            </div>

                                            <motion.button
                                                initial={{ scale: 0.9 }}
                                                animate={{ scale: 1 }}
                                                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleCustomPriceApply}
                                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300"
                                            >
                                                Apply Custom Range
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Active Filters Count */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-4 border-t-2 border-gray-200"
            >
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Active Filters:</span>
                    <motion.div
                        key={selectedCategory + priceRange.join()}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full font-bold"
                    >
                        {(selectedCategory !== 'all' ? 1 : 0) + (priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? 1 : 0)}
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FilterSidebar;