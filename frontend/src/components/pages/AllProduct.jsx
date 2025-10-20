import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/product.action";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Loader from "../layouts/Loader";
import toast from "react-hot-toast";
import Card from "../layouts/Card";
import FilterSidebar from "../layouts/FilterSidebar ";
import { Filter } from "lucide-react";

const AllProduct = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    const { scrollY } = useScroll();

    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search") || "";

    // States
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [sortBy, setSortBy] = useState("default");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Parallax animations
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

        // Filter by price range
        result = result.filter(
            (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
        );

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
    }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

    // Get unique categories and calculate price range
    const categories = ["all", ...new Set(products?.map((p) => p.category?.toLowerCase()).filter(Boolean) || [])];
    const minPrice = 0;
    const maxPrice = products?.length > 0 ? Math.max(...products.map(p => p.price || 0)) : 50000;

    const handleFilterChange = ({ category, priceRange: newPriceRange }) => {
        setSelectedCategory(category);
        setPriceRange(newPriceRange);
    };

    const handleClearSearch = () => {
        setSelectedCategory("all");
        setPriceRange([minPrice, maxPrice]);
        setSortBy("default");
        window.history.pushState({}, "", window.location.pathname);
        window.location.reload();
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
                    </motion.div>

                    {/* Mobile Filter Button */}
                    {!loading && products && products.length > 0 && (
                        <div className="lg:hidden mb-6">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowMobileFilters(!showMobileFilters)}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                            >
                                <Filter size={20} />
                                {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                            </motion.button>
                        </div>
                    )}

                    {/* Main Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filter Sidebar - Desktop */}
                        <div className="hidden lg:block lg:col-span-1">
                            {!loading && products && products.length > 0 && (
                                <div className="sticky top-24">
                                    <FilterSidebar
                                        categories={categories}
                                        onFilterChange={handleFilterChange}
                                        selectedCategory={selectedCategory}
                                        priceRange={priceRange}
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Filter Sidebar - Mobile */}
                        <AnimatePresence>
                            {showMobileFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="lg:hidden col-span-1 overflow-hidden"
                                >
                                    {!loading && products && products.length > 0 && (
                                        <FilterSidebar
                                            categories={categories}
                                            onFilterChange={handleFilterChange}
                                            selectedCategory={selectedCategory}
                                            priceRange={priceRange}
                                            minPrice={minPrice}
                                            maxPrice={maxPrice}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Products Section */}
                        <div className="lg:col-span-3">
                            {/* Sort and Product Count Section */}
                            {!loading && products && products.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 mb-8"
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                Showing <span className="font-bold text-blue-600">{filteredProducts.length}</span> of <span className="font-bold">{products.length}</span> products
                                            </p>
                                        </div>
                                        <div className="w-full sm:w-64">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
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
                        </div>
                    </div>

                    {/* Bottom Padding */}
                    <div className="h-20 sm:h-32" />
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default AllProduct;