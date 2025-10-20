import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef(null);
    const { products } = useSelector((state) => state.products);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter products based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts([]);
            setSuggestedProducts([]);
            setIsSearchOpen(false);
            return;
        }

        const query = searchQuery.toLowerCase();

        // Direct search matches
        const directMatches = products?.filter(
            (product) =>
                product.name?.toLowerCase().includes(query) ||
                product.description?.toLowerCase().includes(query) ||
                product.category?.toLowerCase().includes(query) ||
                product.brand?.toLowerCase().includes(query)
        ) || [];

        setFilteredProducts(directMatches.slice(0, 6));

        // If no direct matches, suggest products from similar category
        if (directMatches.length === 0) {
            // Try to find category matches
            const allCategories = [...new Set(products?.map(p => p.category?.toLowerCase()) || [])];
            const matchingCategory = allCategories.find(cat => cat && cat.includes(query));

            if (matchingCategory) {
                // Show products from matching category
                const categoryProducts = products?.filter(
                    p => p.category?.toLowerCase() === matchingCategory
                ) || [];
                setSuggestedProducts(categoryProducts.slice(0, 6));
            } else {
                // Show random popular products if no category match
                const randomProducts = products?.sort(() => 0.5 - Math.random()).slice(0, 6) || [];
                setSuggestedProducts(randomProducts);
            }
        } else {
            setSuggestedProducts([]);
        }

        setIsSearchOpen(true);
    }, [searchQuery, products]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // ✅ NEW: Handle Enter key press to navigate to products page with search query
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            // Navigate to products page with search parameter
            navigate(`/AllProduct?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setIsFocused(false);
        }
    };

    // ✅ NEW: Handle search button click
    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            navigate(`/AllProduct?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setIsFocused(false);
        }
    };

    const handleProductClick = (product) => {
        // Navigate to product detail page
        navigate(`/product/${product._id || product.id}`);
        setSearchQuery('');
        setIsSearchOpen(false);
        setIsFocused(false);
    };

    const highlightText = (text, query) => {
        if (!query.trim()) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="bg-yellow-200 font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    const ProductCard = ({ product, index, isSuggested = false }) => (
        <div
            key={product._id || product.id || index}
            onClick={() => handleProductClick(product)}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-all duration-200 hover:scale-[1.02] group"
            style={{
                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
            }}
        >
            {/* Product Image */}
            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden group-hover:shadow-md transition-shadow duration-200">
                {product.images && product.images.length > 0 ? (
                    <img
                        src={product.images[0].url || product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                {isSuggested && (
                    <div className="absolute top-1 right-1 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        Suggested
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors duration-200">
                    {isSuggested ? product.name : highlightText(product.name || 'Unnamed Product', searchQuery)}
                </h4>
                <p className="text-xs text-gray-500 truncate">
                    {product.category || 'Uncategorized'} {product.brand && `• ${product.brand}`}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-blue-600">
                        ₹{product.price || '0'}
                    </span>
                    {product.ratings > 0 && (
                        <div className="flex items-center gap-1">
                            <svg
                                className="w-3 h-3 text-yellow-500 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="text-xs text-gray-600">
                                {product.ratings}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Arrow Icon */}
            <svg
                className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M9 5l7 7-7 7" />
            </svg>
        </div>
    );

    return (
        <div ref={searchRef} className="relative w-full max-w-4xl mx-auto">
            {/* Search Input */}
            <div
                className={`flex items-center bg-white rounded-full px-7 py-4 shadow-lg transition-all duration-300 border-2 ${isFocused
                    ? 'border-blue-500 shadow-xl shadow-blue-200 scale-[1.02]'
                    : 'border-transparent hover:border-blue-300 hover:shadow-xl'
                    }`}
            >
                <button
                    onClick={handleSearchSubmit}
                    className="flex-shrink-0 hover:scale-110 transition-transform duration-200"
                >
                    <svg
                        className={`w-7 h-7 transition-all duration-300 ${isFocused ? 'text-blue-600 scale-110' : 'text-gray-400'
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
                <input
                    type="text"
                    placeholder="Search products, brands, categories... (Press Enter)"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsFocused(true)}
                    className="ml-5 bg-transparent outline-none w-full text-lg text-gray-700 placeholder-gray-400 font-medium"
                />
                {searchQuery && (
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setFilteredProducts([]);
                            setSuggestedProducts([]);
                            setIsSearchOpen(false);
                        }}
                        className="ml-2 p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200"
                    >
                        <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            <div
                className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top z-50 ${isSearchOpen
                    ? 'scale-y-100 opacity-100 pointer-events-auto'
                    : 'scale-y-0 opacity-0 pointer-events-none'
                    }`}
            >
                <div className="p-4">
                    {/* Direct Matches */}
                    {filteredProducts.length > 0 && (
                        <>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                                <h3 className="text-sm font-bold text-gray-900">
                                    Search Results ({filteredProducts.length})
                                </h3>
                                {searchQuery && (
                                    <span className="text-xs text-gray-500">
                                        for "{searchQuery}"
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard
                                        key={product._id || product.id || index}
                                        product={product}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Suggested Products when no direct match */}
                    {filteredProducts.length === 0 && suggestedProducts.length > 0 && (
                        <>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">
                                        No exact matches found
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        You might like these products instead
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                                {suggestedProducts.map((product, index) => (
                                    <ProductCard
                                        key={product._id || product.id || index}
                                        product={product}
                                        index={index}
                                        isSuggested={true}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* No results at all */}
                    {filteredProducts.length === 0 && suggestedProducts.length === 0 && searchQuery && (
                        <div className="text-center py-8">
                            <svg
                                className="w-16 h-16 text-gray-300 mx-auto mb-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-sm">
                                No products found for "{searchQuery}"
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                Press Enter to search all products
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {(filteredProducts.length > 0 || suggestedProducts.length > 0) && (
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 flex items-center justify-between">
                        <p className="text-white text-xs font-medium">
                            {filteredProducts.length > 0
                                ? `Showing ${filteredProducts.length} results`
                                : `Showing ${suggestedProducts.length} suggested products`
                            }
                        </p>
                        <button
                            onClick={handleSearchSubmit}
                            className="bg-white text-blue-600 px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-50 transition-colors duration-200"
                        >
                            View All Results
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
        </div>
    );
};

export default SearchBar;