// src/components/layouts/CheckoutButton.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck, Lock, CheckCircle, MapPin, Edit2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/order.Action";
import toast from "react-hot-toast";

const AddressModal = ({ isOpen, onClose, onConfirm, savedAddress, address, setAddress }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 relative">
                        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30">
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <MapPin className="w-5 h-5" /> Delivery Address
                        </h2>
                    </div>

                    <div className="p-5 space-y-4">
                        {/* Saved Address Display */}
                        {savedAddress && (
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                                <p className="font-semibold text-sm text-orange-800 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Saved Address
                                </p>
                                <p className="text-sm mt-1">
                                    {savedAddress.name}, {savedAddress.phoneNo}
                                </p>
                                <p className="text-xs text-gray-600">
                                    {savedAddress.address}, {savedAddress.city}, {savedAddress.state} - {savedAddress.pinCode}
                                </p>
                                <button
                                    onClick={() => {
                                        setAddress({
                                            name: savedAddress.name || "",
                                            phone: savedAddress.phoneNo || "",
                                            flat: savedAddress.address || "",
                                            area: "",
                                            landmark: "",
                                            city: savedAddress.city || "",
                                            pincode: savedAddress.pinCode || "",
                                        });
                                    }}
                                    className="mt-2 text-xs text-orange-600 underline flex items-center gap-1"
                                >
                                    <Edit2 className="w-3 h-3" /> Edit Address
                                </button>
                            </div>
                        )}

                        {/* Address Form */}
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={address.name}
                                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={address.phone}
                                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Flat, House no., Building"
                                value={address.flat}
                                onChange={(e) => setAddress({ ...address, flat: e.target.value })}
                                className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Area, Street, Sector"
                                value={address.area}
                                onChange={(e) => setAddress({ ...address, area: e.target.value })}
                                className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Landmark (Optional)"
                                value={address.landmark}
                                onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                                className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none"
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    className="p-3 border rounded-xl text-sm focus:border-orange-500 outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Pincode"
                                    value={address.pincode}
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                    className="p-3 border rounded-xl text-sm focus:border-orange-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={onClose}
                                className="flex-1 py-2.5 rounded-full border border-gray-300 font-medium text-sm hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const CheckoutModal = ({ isOpen, onClose }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const [showAddress, setShowAddress] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod"); // Default COD

    const savedAddress = user?.shippingInfo || null;

    const [address, setAddress] = useState({
        name: savedAddress?.name || "",
        phone: savedAddress?.phoneNo || "",
        flat: savedAddress?.address || "",
        area: "",
        landmark: "",
        city: savedAddress?.city || "",
        pincode: savedAddress?.pinCode || "",
    });

    const handlePlaceOrder = () => {
        if (!isAuthenticated) {
            toast.error("Please login first");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("Cart is empty");
            return;
        }
        setShowAddress(true);
    };

    const confirmOrder = () => {
        const orderData = {
            shippingInfo: {
                address: address.flat + ", " + address.area + (address.landmark ? ", " + address.landmark : ""),
                city: address.city,
                state: "Delhi", // or get from profile
                pinCode: address.pincode,
                phoneNo: address.phone,
                name: address.name,
            },
            orderItems: cartItems.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.qty,
                image: item.image,
                product: item._id,
            })),
            paymentInfo: {
                id: "cod_" + Date.now(),
                status: "pending",
            },
            itemsPrice: total,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: total,
            paymentMethod: "Cash On Delivery",
        };

        dispatch(createOrder(orderData));
        toast.success("Order placed successfully! Admin will confirm.");
        setShowAddress(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 relative">
                            <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30">
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold">Checkout</h2>
                            <p className="text-xs opacity-90 mt-0.5">Complete your order</p>
                        </div>

                        {/* Body */}
                        <div className="p-5 space-y-4 max-h-96 overflow-y-auto">
                            <div className="space-y-3">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg shadow-sm" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500">₹{item.price.toLocaleString()} × {item.qty}</p>
                                        </div>
                                        <p className="font-bold text-orange-600">₹{(item.price * item.qty).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-orange-600">₹{total.toLocaleString()}</span>
                            </div>

                            {/* Only COD Option */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Payment Method</h3>
                                <div className="flex items-center gap-2 p-3 border-2 border-green-500 rounded-xl bg-green-50">
                                    <input
                                        type="radio"
                                        name="pay"
                                        value="cod"
                                        checked={true}
                                        readOnly
                                        className="text-green-500"
                                    />
                                    <Truck className="w-5 h-5 text-green-600" />
                                    <span className="font-medium text-green-700">Cash on Delivery (COD)</span>
                                </div>

                                {/* Card Option Commented Out */}
                                {/*
                <label className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:border-orange-400 transition text-sm">
                  <input type="radio" name="pay" value="card" className="text-orange-500" />
                  <CreditCard className="w-4 h-4 text-orange-500" />
                  <span>Card</span>
                </label>
                */}
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Lock className="w-3.5 h-3.5 text-green-500" />
                                <span>256-bit SSL encrypted</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 p-4 flex gap-2">
                            <button onClick={onClose} className="flex-1 py-2.5 rounded-full border border-gray-300 font-medium text-sm hover:bg-gray-100">
                                Cancel
                            </button>
                            <button
                                onClick={handlePlaceOrder}
                                className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Place Order
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Address Modal with Saved Address */}
            <AddressModal
                isOpen={showAddress}
                onClose={() => setShowAddress(false)}
                onConfirm={confirmOrder}
                savedAddress={savedAddress}
                address={address}
                setAddress={setAddress}
            />
        </>
    );
};

const CheckoutButton = ({ isOpen = false, onClose = () => { } }) => {
    return <CheckoutModal isOpen={isOpen} onClose={onClose} />;
};

export default CheckoutButton;