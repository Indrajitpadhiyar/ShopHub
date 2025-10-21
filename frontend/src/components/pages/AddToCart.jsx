import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Trash2,
    Plus,
    Minus,
    ShoppingBag,
    ArrowRight,
    CreditCard,
    Shield,
    Truck,
    RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { removeFromCart, updateCartQuantity, getCartItems } from "../../actions/cart.action";
import toast from "react-hot-toast";
import Header from "../layouts/Header";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, error } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Fetch cart items on mount if authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please log in to view your cart");
            navigate("/login");
        } else {
            dispatch(getCartItems()).catch((err) => {
                toast.error(err);
            });
        }
    }, [dispatch, isAuthenticated, navigate]);

    // Handle errors
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "CLEAR_CART_ERRORS" });
        }
    }, [error, dispatch]);

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId))
            .then(() => toast.success("Item removed from cart"))
            .catch((err) => toast.error(err));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;

        dispatch(updateCartQuantity(productId, newQuantity))
            .then(() => toast.success("Quantity updated"))
            .catch((err) => toast.error(err));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateDiscount = () => {
        return calculateTotal() * 0.1; // 10% discount
    };

    const calculateFinalTotal = () => {
        return calculateTotal() - calculateDiscount() + 99; // + shipping
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
        exit: {
            opacity: 0,
            x: 50,
            transition: {
                duration: 0.3,
            },
        },
    };

    if (!isAuthenticated) {
        return null;
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Header />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-center min-h-[80vh] px-4"
                >
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="text-8xl mb-8"
                    >
                        🛒
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold text-gray-800 mb-4 text-center"
                    >
                        Your Cart is Empty
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 text-lg mb-8 text-center max-w-md"
                    >
                        Looks like you haven't added any items to your cart yet. Start shopping to see products here!
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/products")}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Start Shopping
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Shopping Cart
                        </h1>
                        <p className="text-gray-600">
                            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                        </p>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-lg border border-gray-100"
                    >
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-semibold text-gray-700">
                            Items ready to ship
                        </span>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4"
                        >
                            <AnimatePresence>
                                {cartItems.map((item, index) => (
                                    <motion.div
                                        key={item.product}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                                    >
                                        <div className="p-6">
                                            <div className="flex gap-6">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="flex-shrink-0"
                                                >
                                                    <img
                                                        src={
                                                            item.image ||
                                                            "https://via.placeholder.com/400x300?text=No+Image"
                                                        }
                                                        alt={item.name}
                                                        className="w-24 h-24 rounded-2xl object-cover shadow-md group-hover:shadow-lg transition-all duration-300"
                                                    />
                                                </motion.div>

                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                                        {item.name}
                                                    </h3>

                                                    <div className="flex items-center gap-4 mb-3">
                                                        <span className="text-2xl font-bold text-gray-900">
                                                            ₹{item.price?.toLocaleString("en-IN")}
                                                        </span>
                                                        {item.originalPrice > item.price && (
                                                            <span className="text-lg text-gray-500 line-through">
                                                                ₹{item.originalPrice?.toLocaleString("en-IN")}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() =>
                                                                    handleQuantityChange(item.product, item.quantity - 1)
                                                                }
                                                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 group/btn"
                                                            >
                                                                <Minus className="w-4 h-4 text-gray-600 group-hover/btn:text-red-500 transition-colors duration-200" />
                                                            </motion.button>

                                                            <motion.span
                                                                key={item.quantity}
                                                                initial={{ scale: 1.2 }}
                                                                animate={{ scale: 1 }}
                                                                className="w-12 text-center font-semibold text-gray-900 text-lg"
                                                            >
                                                                {item.quantity}
                                                            </motion.span>

                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() =>
                                                                    handleQuantityChange(item.product, item.quantity + 1)
                                                                }
                                                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 group/btn"
                                                            >
                                                                <Plus className="w-4 h-4 text-gray-600 group-hover/btn:text-green-500 transition-colors duration-200" />
                                                            </motion.button>
                                                        </div>

                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleRemoveItem(item.product)}
                                                            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group/remove"
                                                        >
                                                            <Trash2 className="w-4 h-4 group-hover/remove:scale-110 transition-transform duration-200" />
                                                            <span className="font-medium">Remove</span>
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="sticky top-8"
                        >
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        Order Summary
                                    </h2>
                                    <p className="text-blue-100">
                                        Review your items and proceed to checkout
                                    </p>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span>₹{calculateTotal().toLocaleString("en-IN")}</span>
                                    </div>

                                    <div className="flex justify-between text-green-600">
                                        <span>Discount (10%)</span>
                                        <span>-₹{calculateDiscount().toLocaleString("en-IN")}</span>
                                    </div>

                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>₹99</span>
                                    </div>

                                    <hr className="border-gray-200" />

                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{calculateFinalTotal().toLocaleString("en-IN")}</span>
                                    </div>

                                    <div className="flex justify-center gap-4 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Shield className="w-4 h-4 text-green-500" />
                                            Secure
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Truck className="w-4 h-4 text-blue-500" />
                                            Free Returns
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <CreditCard className="w-4 h-4 text-purple-500" />
                                            Safe Payment
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate("/checkout")}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        Proceed to Checkout
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate("/products")}
                                        className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:border-blue-400 hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        Continue Shopping
                                    </motion.button>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-4 text-center text-sm text-gray-500"
                            >
                                <p>🔒 Your payment information is secure and encrypted</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToCart;