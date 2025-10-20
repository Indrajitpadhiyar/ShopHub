import React, { useState } from "react";
import { Star, ShoppingCart, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../actions/cart.action";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                Add to Cart
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Product Info */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
              <img
                src={product.images?.[0]?.url || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={product.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h4>
                <p className="text-lg font-bold text-blue-600">
                  ₹{product.price?.toLocaleString("en-IN") || 0}
                </p>
              </div>
            </div>

            {/* Confirmation Message */}
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to add this item to your cart?
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Yes, Add to Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Card = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    
    // State for confirmation modal
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    if (!product) return null;

    const imageUrl =
        product.images?.[0]?.url ||
        "https://via.placeholder.com/400x300?text=No+Image";

    const inStock = product.stock > 0;
    const rating = product.ratings || 0;

    // Check if product is already in cart
    const isInCart = cartItems.some(item => item.product === product._id);
    const cartItem = cartItems.find(item => item.product === product._id);
    const cartQuantity = cartItem ? cartItem.quantity : 0;

    // Navigate to product detail page
    const handleCardClick = () => {
        navigate(`/product/${product._id}`);
    };

    // Show confirmation modal
    const handleAddClick = (e) => {
        e.stopPropagation();
        
        if (!inStock) {
            toast.error("Product is out of stock");
            return;
        }

        if (isInCart) {
            // If already in cart, navigate to cart page
            navigate("/cart");
            return;
        }

        setShowConfirmation(true);
    };

    // Handle confirmed add to cart
    const handleConfirmAddToCart = async () => {
        setIsAdding(true);
        try {
            await dispatch(addToCart(product._id, 1));
            toast.success("Product added to cart!", {
                icon: '🛒',
                style: {
                    borderRadius: '10px',
                    background: '#10b981',
                    color: '#fff',
                },
            });
            setShowConfirmation(false);
            
            // Optional: Auto-navigate to cart after successful add
            // setTimeout(() => {
            //     navigate("/cart");
            // }, 1000);
            
        } catch (error) {
            toast.error(error?.message || "Failed to add product to cart");
        } finally {
            setIsAdding(false);
        }
    };

    // Close confirmation modal
    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    return (
        <>
            <motion.div
                onClick={handleCardClick}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-400 hover:-translate-y-2 cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
            >
                {/* Animated shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                {/* Image Section */}
                <div className="relative overflow-hidden bg-gray-50">
                    <img
                        src={imageUrl}
                        alt={product.name || "Product"}
                        className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />

                    {/* Stock Badge */}
                    {!inStock && (
                        <motion.div 
                            className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            Out of Stock
                        </motion.div>
                    )}

                    {/* In Cart Badge */}
                    {isInCart && (
                        <motion.div 
                            className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            <Check className="w-3 h-3" />
                            In Cart ({cartQuantity})
                        </motion.div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Product Name */}
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14 group-hover:text-blue-600 transition-all duration-200 group-hover:tracking-wide">
                        {product.name || "Unnamed Product"}
                    </h2>

                    {/* 5 Star Rating */}
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

                    {/* Price and Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="transition-transform duration-300 group-hover:scale-110">
                            <p className="text-xs text-gray-500 mb-0.5">Price</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{product.price?.toLocaleString("en-IN") || 0}
                            </p>
                        </div>
                        <motion.button
                            onClick={handleAddClick}
                            disabled={!inStock || isAdding}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 relative overflow-hidden ${
                                inStock
                                    ? isInCart 
                                        ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:scale-105"
                                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 hover:gap-3"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            } ${isAdding ? "opacity-50 cursor-not-allowed" : ""}`}
                            whileHover={inStock && !isInCart && !isAdding ? { scale: 1.05 } : {}}
                            whileTap={inStock && !isAdding ? { scale: 0.95 } : {}}
                        >
                            {/* Loading animation */}
                            {isAdding && (
                                <motion.div
                                    className="absolute inset-0 bg-blue-700 rounded-lg"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                            
                            <ShoppingCart className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">
                                {isAdding ? "Adding..." : isInCart ? "View Cart" : "Add"}
                            </span>
                            
                            {/* Cart counter animation */}
                            {isInCart && cartQuantity > 0 && (
                                <motion.span
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    key={cartQuantity}
                                >
                                    {cartQuantity}
                                </motion.span>
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmation}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirmAddToCart}
                product={product}
            />
        </>
    );
};

export default Card;