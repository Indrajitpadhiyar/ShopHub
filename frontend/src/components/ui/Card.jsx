// src/components/ui/Card.jsx
import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ product }) => {
    const navigate = useNavigate();

    if (!product) return null;

    const imageUrl = product.images?.[0]?.url || "https://via.placeholder.com/400x300?text=No+Image";
    const inStock = product.stock > 0;
    const rating = product.ratings || 0;

    const handleCardClick = () => navigate(`/product/${product._id}`);

    return (
        <motion.div
            onClick={handleCardClick}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-400 hover:-translate-y-2 cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Hover shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

            {/* Product Image */}
            <div className="relative overflow-hidden bg-gray-50">
                <img
                    src={imageUrl}
                    alt={product.name || "Product"}
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Out of Stock Badge */}
                {!inStock && (
                    <motion.div
                        className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        Out of Stock
                    </motion.div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14 group-hover:text-blue-600 transition-all duration-200 group-hover:tracking-wide">
                    {product.name || "Unnamed Product"}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-4 h-4 transition-all duration-300 ${star <= Math.floor(rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300 fill-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                        {rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400">
                        ({product.numOfReviews ?? 0})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                        <p className="text-xs text-gray-500 mb-0.5">Price</p>
                        <p className="text-2xl font-bold text-gray-900">
                            ₹{product.price?.toLocaleString("en-IN") || 0}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Card;