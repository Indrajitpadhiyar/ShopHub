// src/pages/MyOrder.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Truck, Package, Clock, CheckCircle, X, ChevronRight, ShoppingBag } from "lucide-react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { getMyOrders } from "../../redux/actions/order.Action";
import toast from "react-hot-toast";

const MyOrder = () => {
    const dispatch = useDispatch();
    const { loading, orders, error } = useSelector((state) => state.myOrders || {});

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const getStatusIcon = (status) => {
        switch (status) {
            case "Processing":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case "Shipped":
                return <Truck className="w-5 h-5 text-orange-500" />;
            case "Delivered":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "Cancelled":
                return <X className="w-5 h-5 text-red-500" />;
            default:
                return <Package className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "text-green-600 bg-green-50";
            case "Shipped":
                return "text-orange-600 bg-orange-50";
            case "Processing":
                return "text-yellow-600 bg-yellow-50";
            case "Cancelled":
                return "text-red-600 bg-red-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
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
                    <div className="text-center">
                        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-6">Your orders will appear here once you place one.</p>
                        <button
                            onClick={() => window.location.href = "/products"}
                            className="px-6 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition"
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
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center mb-8 text-orange-800"
                    >
                        My Orders
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {orders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                            >
                                {/* Order Header */}
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm opacity-90">Order Placed</p>
                                            <p className="text-lg font-semibold">
                                                #{order._id.substring(order._id.length - 6).toUpperCase()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm opacity-90">Total: ₹{order.totalPrice.toLocaleString("en-IN")}</p>
                                            <p className="text-xs opacity-75 mt-1">
                                                {new Date(order.createdAt).toLocaleDateString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-6 space-y-4">
                                    {order.orderItems.map((item) => (
                                        <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-orange-900 truncate">{item.name}</h4>
                                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-orange-900">
                                                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Status */}
                                <div className="p-6 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-2 rounded-full ${getStatusColor(order.orderStatus)}`}>
                                                {getStatusIcon(order.orderStatus)}
                                            </div>
                                            <div>
                                                <p className={`font-semibold ${getStatusColor(order.orderStatus).replace('bg-', 'text-')}`}>
                                                    {order.orderStatus}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {order.paymentMethod === "Cash On Delivery" ? "Pay on delivery" : "Paid"}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium transition">
                                            View Details
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
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