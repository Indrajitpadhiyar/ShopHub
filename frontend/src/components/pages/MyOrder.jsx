// src/pages/MyOrder.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import FancyDeliveryStatus from "../ui/FancyDeliveryStatus";
import { getMyOrders } from "../../redux/actions/order.Action";
import toast from "react-hot-toast";

const MyOrder = () => {
    const dispatch = useDispatch();
    const { loading, orders, error } = useSelector((state) => state.myOrders || {});
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const toggleExpand = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <Footer />
            </>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center max-w-md">
                        <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-gray-700 mb-3">No orders yet</h2>
                        <p className="text-gray-500 mb-8">Your orders will appear here once you place one.</p>
                        <button
                            onClick={() => window.location.href = "/products"}
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105"
                        >
                            Start Shopping
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            {/* FULLY CENTERED CONTENT */}
            <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
                <div className="w-full max-w-4xl mx-auto">
                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-center mb-12 text-orange-800"
                    >
                        My Orders
                    </motion.h1>

                    {/* Orders List */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 md:p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                        <div>
                                            <p className="text-sm opacity-90">Order ID</p>
                                            <p className="text-lg md:text-xl font-bold">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm opacity-90">Total</p>
                                            <p className="text-xl md:text-2xl font-bold">
                                                ₹{order.totalPrice.toLocaleString("en-IN")}
                                            </p>
                                            <p className="text-xs opacity-75 mt-1">
                                                {new Date(order.createdAt).toLocaleDateString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Items Summary */}
                                <div className="p-5 md:p-6 space-y-4">
                                    {order.orderItems.slice(0, 2).map((item) => (
                                        <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg shadow-sm"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-orange-900 truncate text-sm md:text-base">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs md:text-sm text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-orange-900 text-sm md:text-base">
                                                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {order.orderItems.length > 2 && (
                                        <p className="text-center text-sm text-gray-500">
                                            + {order.orderItems.length - 2} more items
                                        </p>
                                    )}
                                </div>

                                {/* Address + Fancy Status + Toggle */}
                                <div className="border-t border-gray-200 p-5 md:p-6 bg-gray-50">
                                    <div className="space-y-6">
                                        {/* Address */}
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800 text-sm">Delivery Address</p>
                                                <p className="text-xs md:text-sm text-gray-700 mt-0.5">
                                                    <span className="font-medium">{order.shippingInfo.name}</span> • {order.shippingInfo.phoneNo}
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                                    {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pinCode}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Fancy 3D Status */}
                                        <div>
                                            <FancyDeliveryStatus status={order.orderStatus} />
                                        </div>

                                        {/* Toggle Button */}
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => toggleExpand(order._id)}
                                                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium transition"
                                            >
                                                {expandedOrder === order._id ? (
                                                    <>
                                                        Hide Details <ChevronUp className="w-4 h-4" />
                                                    </>
                                                ) : (
                                                    <>
                                                        View Details <ChevronDown className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                <AnimatePresence>
                                    {expandedOrder === order._id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-gray-200 bg-white overflow-hidden"
                                        >
                                            <div className="p-5 md:p-6 space-y-5">
                                                {/* All Items */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 mb-3">All Items</h4>
                                                    <div className="space-y-3">
                                                        {order.orderItems.map((item) => (
                                                            <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-14 h-14 object-cover rounded-md"
                                                                />
                                                                <div className="flex-1">
                                                                    <p className="font-medium text-sm">{item.name}</p>
                                                                    <p className="text-xs text-gray-500">₹{item.price} × {item.quantity}</p>
                                                                </div>
                                                                <p className="font-semibold text-orange-600">
                                                                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Price Breakdown */}
                                                <div className="border-t pt-4">
                                                    <h4 className="font-semibold text-gray-800 mb-3">Price Breakdown</h4>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span>Items Price</span>
                                                            <span>₹{order.itemsPrice.toLocaleString("en-IN")}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Tax</span>
                                                            <span>₹{order.taxPrice.toLocaleString("en-IN")}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Shipping</span>
                                                            <span>₹{order.shippingPrice.toLocaleString("en-IN")}</span>
                                                        </div>
                                                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                                                            <span>Total</span>
                                                            <span className="text-orange-600">₹{order.totalPrice.toLocaleString("en-IN")}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Payment Info */}
                                                <div className="bg-green-50 p-4 rounded-lg">
                                                    <p className="text-sm font-medium text-green-800">
                                                        Payment: Cash on Delivery
                                                    </p>
                                                    <p className="text-xs text-green-600 mt-1">
                                                        ID: {order.paymentInfo.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default MyOrder;