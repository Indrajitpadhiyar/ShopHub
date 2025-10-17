// src/components/ReviewCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Star, User } from "lucide-react";

const ReviewCard = ({ product }) => {
    return (
        <motion.div
            className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
        >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                Customer Reviews
            </h2>

            {product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-4 sm:space-y-6">
                    {product.reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-6 border border-gray-100"
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 + index * 0.1 }}
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        >
                            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                                <motion.div
                                    className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full p-2 sm:p-4"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <User size={20} sm:size={28} className="text-white" />
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2">
                                        <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{review.name || "Anonymous"}</h3>
                                        <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-2 sm:px-3 py-1 rounded-full">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12} sm:size={14}
                                                    className={`${i < Math.floor(review.rating || 0) ? "text-white fill-white" : "text-white/40"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{review.comment || "No comment"}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    className="text-center py-8 sm:py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="bg-gray-100 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Star size={32} sm:size={40} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-base sm:text-lg">No reviews yet. Be the first to review this product!</p>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ReviewCard;