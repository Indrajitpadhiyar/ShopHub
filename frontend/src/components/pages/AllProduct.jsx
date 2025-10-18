import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/product.action";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer"
import Loader from "../layouts/Loader";
import toast from "react-hot-toast";
import Card from "../layouts/Card";

const AllProduct = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    const { scrollY } = useScroll();

    // Parallax animations based on scroll
    const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
    const rotate = useTransform(scrollY, [0, 1000], [0, 360]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error || "Something went wrong while fetching products");
        }
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            />
            <motion.div
                style={{ y: y1, rotate }}
                className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            />
            <motion.div
                style={{ y: y2, scale }}
                className="absolute top-1/2 right-1/4 w-56 h-56 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-25"
            />

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
                <Header />
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
                >
                    {/* Title Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-center mb-8 sm:mb-12"
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
                            Explore All Products
                        </h1>
                        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                    </motion.div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <Loader />
                        </div>
                    ) : products && products.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                        >
                            {products.map((product, index) => (
                                <motion.div
                                    key={product._id || index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <Card product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        !loading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-6xl sm:text-7xl mb-4 sm:mb-6"
                                >
                                    📦
                                </motion.div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                                    No products found.
                                </h3>
                                <p className="text-sm sm:text-base text-gray-500">
                                    Check back later for new arrivals!
                                </p>
                            </motion.div>
                        )
                    )}
                </motion.div>

                {/* Bottom Padding for better scroll experience */}
                <div className="h-20 sm:h-32" />
            </div>
            <Footer />
        </div>
    );
};

export default AllProduct;