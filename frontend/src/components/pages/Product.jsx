import React, { useEffect, useState } from "react";
import Card from "../ui/Card";
import { getProducts } from "../../actions/product.action";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Product = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState([]);

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
  }, [products, selectedCategory, sortBy]);

  // Get unique categories
  const categories = ["all", ...new Set(products?.map((p) => p.category?.toLowerCase()).filter(Boolean) || [])];

  return (
    <div className="w-full">
      {/* Header with gradient background */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Our Products
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters Section - Modern Card Design */}
      {!loading && products && products.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                      }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:w-72">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 bg-white text-sm font-medium appearance-none cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Products Grid with Animations */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((p, index) => (
            <motion.div
              key={p._id || p.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
            >
              <Card product={p} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-xl p-12 text-center border border-blue-100"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-7xl mb-6"
          >
            📦
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No Products Found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any products in this category.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory("all")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Products
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Product;