import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import ReactStars from "react-rating-stars-component";
import product from '../pages/Product'

const Card = ({ products }) => {
    return (
        <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 max-w-sm">
            {/* Wishlist Button */}
            <button
                className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:scale-110"
                aria-label="Add to wishlist"
            >
                <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
            </button>

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                    src={products.images[0].url}
                    alt={products.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Out of Stock Overlay */}
                {!products.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-4">
                {/* Product Name */}
                <h3 className="font-bold text-gray-900 mb-2 text-lg line-clamp-2 h-14">
                    {products.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(products.rating) ? 'fill-current' : 'stroke-current fill-transparent'}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{products.rating}</span>
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">₹{products.price.toLocaleString()}</span>
                    {products.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{products.originalPrice.toLocaleString()}</span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    disabled={!products.inStock}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${products.inStock
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    <ShoppingCart className="w-5 h-5" />
                    {products.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-all duration-300 pointer-events-none"></div>
        </div>
    );
};

export default Card;