import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/product.action";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Loader from "../layouts/Loader";
import toast from "react-hot-toast";
import Card from "../layouts/Card";

const AllProduct = () => {
    const dispatch = useDispatch();
    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
    const { scrollY } = useScroll();

    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search") || "";

    // States
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    // Parallax animations
    const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
    const rotate = useTransform(scrollY, [0, 1000], [0, 360]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.2]);

    useEffect(() => {
        dispatch(getProducts(currentPage));
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (error) {
            toast.error(error || "Something went wrong while fetching products");
        }
    }, [error]);

    // Filter and sort products
    useEffect(() => {
        if (!products || products.length === 0) {
            setFilteredProducts([]);
            return;
        }

        let result = [...products];

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (product) =>
                    product.name?.toLowerCase().includes(query) ||
                    product.description?.toLowerCase().includes(query) ||
                    product.category?.toLowerCase().includes(query) ||
                    product.brand?.toLowerCase().includes(query)
            );
        }

        // Filter by category
        if (selectedCategory !== "all") {
            result = result.filter(
                (product) => product.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Sort products
        switch (sortBy) {
            case "price-low":
                result.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case "price-high":
                result.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
            case "rating":
                result.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
                break;
            case "name":
                result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
                break;
            default:
                break;
        }

        setFilteredProducts(result);
    }, [products, searchQuery, selectedCategory, sortBy]);

    // Get unique categories
    const categories = ["all", ...new Set(products?.map((p) => p.category?.toLowerCase()).filter(Boolean) || [])];

    // Calculate pagination
    const totalProducts = filteredProductsCount || productsCount || filteredProducts.length;
    const totalPages = resultPerPage ? Math.ceil(totalProducts / resultPerPage) : 1;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleClearSearch = () => {
        setSelectedCategory("all");
        setSortBy("default");
        window.history.pushState({}, "", window.location.pathname);
        window.location.reload();
    };

    // Pagination component
    const Pagination = () => {
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-8"
            >
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white shadow-md hover:shadow-lg"
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* First Page */}
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-blue-500 hover:text-white shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="text-gray-500">...</span>}
                    </>
                )}

                {/* Page Numbers */}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === page
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110"
                                : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white shadow-md hover:shadow-lg"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Last Page */}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-blue-500 hover:text-white shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-blue-500 hover:text-white shadow-md hover:shadow-lg"
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </motion.div>
        );
    };

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
                            {searchQuery ? (
                                <>
                                    Search Results for{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                                        "{searchQuery}"
                                    </span>
                                </>
                            ) : (
                                "Explore All Products"
                            )}
                        </h1>
                        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                        <p className="text-gray-600 mt-4 text-sm sm:text-base">
                            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
                        </p>
                    </motion.div>

                    {/* Filters and Sort Section */}
                    {!loading && products && products.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 mb-8"
                        >
                            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                                {/* Category Filter */}
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Filter by Category
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort Dropdown */}
                                <div className="lg:w-64">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Sort By
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white text-sm"
                                    >
                                        <option value="default">Default</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="name">Name: A to Z</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Products Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center min-h-[400px]">
                            <Loader />
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                            >
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product._id || index}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.05,
                                            ease: "easeOut",
                                        }}
                                        whileHover={{
                                            y: -8,
                                            transition: { duration: 0.3 },
                                        }}
                                    >
                                        <Card product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Pagination */}
                            {totalPages > 1 && <Pagination />}
                        </>
                    ) : searchQuery ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="text-6xl sm:text-7xl mb-4 sm:mb-6"
                            >
                                🔍
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                                No products found for "{searchQuery}"
                            </h3>
                            <p className="text-sm sm:text-base text-gray-500 mb-6">
                                Try different keywords or browse all products
                            </p>
                            <button
                                onClick={handleClearSearch}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-200"
                            >
                                Clear Search
                            </button>
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
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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

                {/* Bottom Padding */}
                <div className="h-20 sm:h-32" />
            </div>
            <Footer />
        </div>
    );
};

export default AllProduct;