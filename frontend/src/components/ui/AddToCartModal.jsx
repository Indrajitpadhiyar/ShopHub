// src/components/ui/AddToCartModal.jsx
import React, { useState } from "react";
import { ShoppingCart, Check, X, Plus, Minus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AddToCartModal = ({ isOpen, onClose, product, onConfirm }) => {
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        if (loading || !onConfirm) return;
        setLoading(true);
        try {
            await onConfirm(qty); // Yeh Card.jsx mein dispatch karega
            onClose(); // Success → Modal band
        } catch (error) {
            console.error("Add to cart failed:", error);
            alert("Failed to add item!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
                        initial={{ scale: 0.7, y: 100 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.7, y: 100 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50" />

                        {/* Header */}
                        <div className="relative flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <ShoppingCart className="w-6 h-6 text-blue-600" />
                                Add to Cart
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Product */}
                        <div className="relative bg-gray-50/80 rounded-2xl p-4 mb-6 flex items-center gap-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                                <img
                                    src={product.images?.[0]?.url || "https://via.placeholder.com/80"}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 line-clamp-1 text-lg">
                                    {product.name}
                                </h4>
                                <p className="text-xl font-bold text-blue-600">
                                    ₹{product.price?.toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <button
                                onClick={() => setQty(q => Math.max(1, q - 1))}
                                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition disabled:opacity-50"
                                disabled={qty <= 1}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-xl font-bold w-12 text-center">{qty}</span>
                            <button
                                onClick={() => setQty(q => q + 1)}
                                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={loading}
                                className={`flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium flex items-center justify-center gap-2 transition-all ${loading ? "opacity-70 cursor n-ot-allowed" : "hover:shadow-lg"
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddToCartModal;