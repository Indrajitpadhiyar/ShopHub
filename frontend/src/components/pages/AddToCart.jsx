// src/pages/AddToCart.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Plus, Minus, X, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import { removeFromCart, updateCartQuantity } from '../..//actions/cart.action'; 

const AddToCart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if (cartItems.length === 0) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-20 flex items-center justify-center p-4">
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                        <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-700 mb-2">Cart is Empty!</h2>
                        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2 hover:shadow-lg">
                            <ArrowLeft /> Shop Now
                        </Link>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Your Cart ({totalItems} items)
                    </h1>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cartItems.map(item => (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-4"
                                    >
                                        <img src={item.images?.[0]?.url} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <p className="text-2xl font-bold text-blue-600">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => dispatch(updateCartQuantity({ productId: item._id, quantity: item.quantity - 1 }))}
                                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(updateCartQuantity({ productId: item._id, quantity: item.quantity + 1 }))}
                                                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => dispatch(removeFromCart(item._id))}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between"><span>Subtotal</span><span>₹{totalPrice.toLocaleString("en-IN")}</span></div>
                                    <div className="flex justify-between"><span>Shipping</span><span className="text-green-600">FREE</span></div>
                                    <div className="border-t pt-3 flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-blue-600">₹{totalPrice.toLocaleString("en-IN")}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition">
                                    Proceed to Checkout
                                </button>
                                <Link to="/" className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-xl text-center block hover:bg-gray-50">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddToCart;