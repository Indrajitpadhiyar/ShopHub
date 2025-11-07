// src/components/CheckoutButton.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Truck, Lock, CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";

const CheckoutModal = ({ isOpen, onClose }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-2xl font-bold">Checkout</h2>
                        <p className="text-sm opacity-90 mt-1">Complete your order securely</p>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-5">
                        {/* Order Summary */}
                        <div className="bg-orange-50 rounded-2xl p-4">
                            <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between text-sm mb-2">
                                    <span className="truncate max-w-[180px]">
                                        {item.name} × {item.qty}
                                    </span>
                                    <span className="font-medium">₹{(item.price * item.qty).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="border-t border-orange-200 pt-3 mt-3 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-orange-600">₹{total.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Payment Options */}
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Payment Method</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-orange-400 transition">
                                    <input type="radio" name="pay" className="text-orange-500" defaultChecked />
                                    <CreditCard className="w-5 h-5 text-orange-500" />
                                    <span className="font-medium">Card</span>
                                </label>
                                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-orange-400 transition">
                                    <input type="radio" name="pay" className="text-orange-500" />
                                    <Truck className="w-5 h-5 text-green-500" />
                                    <span className="font-medium">COD</span>
                                </label>
                            </div>
                        </div>

                        {/* Secure Note */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Lock className="w-4 h-4 text-green-500" />
                            <span>Your payment is secured with 256-bit SSL encryption</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 p-6 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 rounded-full border border-gray-300 font-medium hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button className="flex-1 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Place Order
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const CheckoutButton = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="w-full mt-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xl font-bold rounded-full shadow-lg"
            >
                Proceed to Checkout
            </motion.button>

            <CheckoutModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
    );
};

export default CheckoutButton;