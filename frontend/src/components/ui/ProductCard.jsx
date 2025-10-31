'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Zap } from 'lucide-react';

const ProductCard = ({
    id,
    name,
    price,
    description,
    ratings = 0,
    images = [],
    stock = 0,
    numOfReviews = 0,
}) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        if (stock <= 0) return;
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const title = name || "Unnamed Product";
    const imageUrl = images[0]?.url || 'https://via.placeholder.com/300x300/eee/aaa?text=No+Image';
    const isInStock = stock > 0;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
            style={{ minHeight: '460px' }}
        >
            {/* Wishlist Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-3 right-3 z-20 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:shadow-lg transition-all"
            >
                <Heart
                    className={`h-5 w-5 transition-colors ${isWishlisted ? 'fill-orange-500 text-orange-500' : 'text-gray-600'
                        }`}
                />
            </motion.button>

            {/* IMAGE - FULL, NO CROP */}
            <div className="relative overflow-hidden bg-white h-56 flex-shrink-0 flex items-center justify-center z-10">
                <motion.img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300/eee/aaa?text=No+Image';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3 flex flex-col flex-grow z-10">
                <h3 className="font-semibold text-gray-800 line-clamp-2 text-lg group-hover:text-orange-600 transition-colors leading-tight">
                    {title}
                </h3>

                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(ratings)
                                    ? 'fill-orange-400 text-orange-400'
                                    : 'text-gray-300'
                                }`}
                        />
                    ))}
                    {numOfReviews > 0 && (
                        <span className="text-xs text-gray-500 ml-1">({numOfReviews})</span>
                    )}
                </div>

                <div className="flex items-center space-x-2 mt-auto">
                    <span className="text-2xl font-bold text-orange-600">
                        ₹{Number(price).toLocaleString('en-IN')}
                    </span>
                </div>

                {!isInStock && (
                    <p className="text-sm text-red-600 font-medium">Out of Stock</p>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className={`w-full py-3 rounded-full font-semibold transition-all flex items-center justify-center space-x-2 mt-auto ${isInStock
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md hover:shadow-xl'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {isAdded ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center space-x-1"
                        >
                            <Zap className="h-4 w-4" />
                            <span>Added!</span>
                        </motion.div>
                    ) : (
                        <>
                            <ShoppingCart className="h-5 w-5" />
                            <span>{isInStock ? 'Add to Cart' : 'Unavailable'}</span>
                        </>
                    )}
                </motion.button>
            </div>

            {/* FULL CARD ORANGE GLOW ON HOVER */}
            <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/30 via-transparent to-transparent opacity-0 pointer-events-none -z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

export default ProductCard;