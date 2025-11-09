// src/components/layouts/CheckoutButton.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck, Lock, CheckCircle, MapPin, Edit2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/actions/order.Action";
import { clearCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddressModal = ({ isOpen, onClose, onConfirm, savedAddress, address, setAddress }) => {
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
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
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
                        {savedAddress && (
                            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                                <p className="font-semibold text-sm text-orange-800 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Saved Address
                                </p>
                                <p className="text-sm mt-1">{savedAddress.name}, {savedAddress.phoneNo}</p>
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
                                    <Edit2 className="w-3 h-3" /> Edit
                                </button>
                            </div>
                        )}

                        <div className="space-y-3">
                            <input type="text" placeholder="Full Name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none" />
                            <input type="text" placeholder="Phone Number" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none" />
                            <input type="text" placeholder="Flat, House no." value={address.flat} onChange={(e) => setAddress({ ...address, flat: e.target.value })} className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none" />
                            <input type="text" placeholder="Area, Street" value={address.area} onChange={(e) => setAddress({ ...address, area: e.target.value })} className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none" />
                            <input type="text" placeholder="Landmark (Optional)" value={address.landmark} onChange={(e) => setAddress({ ...address, landmark: e.target.value })} className="w-full p-3 border rounded-xl text-sm focus:border-orange-500 outline-none" />
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="p-3 border rounded-xl text-sm focus:border-orange-500 outline-none" />
                                <input type="text" placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="p-3 border rounded-xl text-sm focus:border-orange-500 outline-none" />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button onClick={onClose} className="flex-1 py-2.5 rounded-full border border-gray-300 font-medium text-sm hover:bg-gray-100">Cancel</button>
                            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-1.5">
                                <CheckCircle className="w-4 h-4" /> Confirm
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const CheckoutModal = ({ isOpen, onClose, onSuccess }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const [showAddress, setShowAddress] = useState(false);
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
        if (cartItems.length === 0) return toast.error("Cart is empty");
        setShowAddress(true);
    };

    const confirmOrder = () => {
        const orderData = {
            shippingInfo: {
                address: address.flat + ", " + address.area + (address.landmark ? ", " + address.landmark : ""),
                city: address.city,
                state: "Delhi",
                pinCode: address.pincode,
                phoneNo: address.phone,
                name: address.name,
                country: "India", // YE JARURI HAI!
            },
            orderItems: cartItems.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.qty,
                image: item.image,
                product: item._id,
            })),
            paymentInfo: { id: "cod_" + Date.now(), status: "pending" },
            itemsPrice: total,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: total,
        };

        dispatch(createOrder(orderData));
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        setShowAddress(false);
        onClose();
        if (onSuccess) onSuccess();
        navigate("/profile/orders");
    };

    if (!isOpen) return null;

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 relative">
                            <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30">
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold">Checkout</h2>
                        </div>

                        <div className="p-5 space-y-4 max-h-96 overflow-y-auto">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm truncate">{item.name}</p>
                                        <p className="text-xs text-gray-500">₹{item.price} × {item.qty}</p>
                                    </div>
                                    <p className="font-bold text-orange-600">₹{(item.price * item.qty).toLocaleString()}</p>
                                </div>
                            ))}
                            <div className="border-t pt-3 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-orange-600">₹{total.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 border-2 border-green-500 rounded-xl bg-green-50">
                                <Truck className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-green-700">Cash on Delivery</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 flex gap-2">
                            <button onClick={onClose} className="flex-1 py-2.5 rounded-full border border-gray-300 font-medium text-sm hover:bg-gray-100">Cancel</button>
                            <button onClick={handlePlaceOrder} className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-1.5">
                                <CheckCircle className="w-4 h-4" /> Place Order
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

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

const CheckoutButton = ({ isOpen = false, onClose = () => { }, onSuccess = () => { } }) => {
    return <CheckoutModal isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />;
};

export default CheckoutButton;