// src/components/Cart.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
import {
    getCartItems,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    clearCartErrors,
} from "../../actions/cart.action";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../layouts/Loader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, loading, error } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isClearing, setIsClearing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please log in to view your cart");
            navigate("/login");
            return;
        }
        dispatch(getCartItems())
            .then(() => {
                setLastUpdated(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
            })
            .catch((err) => {
                toast.error(err || "Failed to load cart items");
                console.error("Get cart items error:", err);
            });
    }, [dispatch, isAuthenticated, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error || "An error occurred with the cart");
            dispatch(clearCartErrors());
        }
    }, [error, dispatch]);

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId))
            .then(() => {
                toast.success("Item removed from cart!", {
                    style: { borderRadius: "10px", background: "#10b981", color: "#fff" },
                });
                setLastUpdated(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
            })
            .catch((err) => {
                toast.error(err || "Failed to remove item");
            });
    };

    const handleUpdateQuantity = (productId, quantity, stock) => {
        if (quantity < 1 || quantity > stock) {
            toast.error(`Quantity must be between 1 and ${stock}`);
            return;
        }
        dispatch(updateCartQuantity(productId, quantity))
            .then(() => {
                toast.success("Quantity updated!", {
                    style: { borderRadius: "10px", background: "#10b981", color: "#fff" },
                });
                setLastUpdated(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
            })
            .catch((err) => {
                toast.error(err || "Failed to update quantity");
            });
    };

    const handleClearCart = () => {
        setIsClearing(true);
        dispatch(clearCart())
            .then(() => {
                toast.success("Cart cleared!", {
                    style: { borderRadius: "10px", background: "#10b981", color: "#fff" },
                });
                setLastUpdated(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
            })
            .catch((err) => {
                toast.error(err || "Failed to clear cart");
            })
            .finally(() => setIsClearing(false));
    };

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ).toLocaleString("en-IN");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <Header />
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <ShoppingCart className="w-8 h-8 text-indigo-600" />
                        Your Cart
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
                    </p>
                    {lastUpdated && (
                        <p className="text-gray-500 text-xs mt-1">
                            Last updated: {lastUpdated}
                        </p>
                    )}
                </motion.div>

                {cartItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl p-6 sm:p-12 text-center border border-blue-100"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="text-5xl sm:text-7xl mb-4"
                        >
                            🛒
                        </motion.div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                            Your Cart is Empty
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Add some products to your cart to get started!
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/")}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Shop Now
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Cart Items */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item.product}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0"
                                >
                                    <motion.img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-xl object-cover"
                                        whileHover={{ scale: 1.05 }}
                                    />
                                    <div className="flex-1">
                                        <h3
                                            className="font-semibold text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors"
                                            onClick={() => navigate(`/product/${item.product}`)}
                                        >
                                            {item.name}
                                        </h3>
                                        <p className="text-lg font-bold text-indigo-600">
                                            ₹{item.price.toLocaleString("en-IN")}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Stock: {item.stock} available
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() =>
                                                handleUpdateQuantity(item.product, item.quantity - 1, item.stock)
                                            }
                                            disabled={item.quantity <= 1}
                                            className="bg-indigo-100 text-indigo-600 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Minus size={16} />
                                        </motion.button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleUpdateQuantity(
                                                    item.product,
                                                    parseInt(e.target.value) || 1,
                                                    item.stock
                                                )
                                            }
                                            min="1"
                                            max={item.stock}
                                            className="w-16 text-center text-sm font-bold text-gray-900 border-2 border-indigo-200 rounded-xl py-1 focus:outline-none focus:border-indigo-500"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() =>
                                                handleUpdateQuantity(item.product, item.quantity + 1, item.stock)
                                            }
                                            disabled={item.quantity >= item.stock}
                                            className="bg-indigo-100 text-indigo-600 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Plus size={16} />
                                        </motion.button>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleRemoveItem(item.product)}
                                        className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Cart Summary</h3>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Subtotal ({cartItems.length} items):</span>
                                <span className="text-xl font-bold text-indigo-600">
                                    ₹{calculateTotal()}
                                </span>
                            </div>
                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleClearCart}
                                    disabled={isClearing}
                                    className={`flex-1 py-3 px-4 bg-red-100 text-red-600 rounded-xl font-semibold transition-all duration-200 ${isClearing ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isClearing ? "Clearing..." : "Clear Cart"}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(79, 70, 229, 0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate("/checkout")} // Adjust route as needed
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={20} />
                                    Proceed to Checkout
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;