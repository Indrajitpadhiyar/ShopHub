// src/components/ui/AddToCartModal.jsx
import React from "react";
import { ShoppingCart, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddToCartModal = ({
    isOpen,
    onClose,
    onConfirm,
    product,
    quantity = 1,
    isAdding = false,
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
                        initial={{ scale: 0.7, opacity: 0, y: 100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.7, opacity: 0, y: 100 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Animated background wave effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-20"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <ShoppingCart className="w-6 h-6 text-blue-600 animate-pulse" />
                                Add to Cart
                            </h3>
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </motion.button>
                        </div>

                        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl shadow-inner">
                            <motion.img
                                src={product.images?.[0]?.url || "https://via.placeholder.com/400x300?text=No+Image"}
                                alt={product.name}
                                className="w-20 h-20 rounded-xl object-cover"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 line-clamp-2 text-lg">
                                    {product.name}
                                </h4>
                                <p className="text-xl font-bold text-blue-600">
                                    ₹{product.price?.toLocaleString("en-IN") || 0}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Quantity: <span className="font-semibold">{quantity}</span>
                                </p>
                            </div>
                        </div>

                        <motion.p
                            className="text-gray-600 mb-6 text-center text-base font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Are you sure you want to add this item to your cart?
                        </motion.p>

                        <div className="flex gap-4">
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-all duration-200"
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                onClick={onConfirm}
                                disabled={isAdding}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isAdding ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <Check className="w-5 h-5" />
                                {isAdding ? "Adding..." : "Yes, Add to Cart"}
                                {isAdding && (
                                    <motion.div
                                        className="absolute right-4"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </motion.div>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddToCartModal;