// src/components/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Star,
  User,
  Heart,
  Share2,
  TruckIcon,
  ShieldCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/product.action";
import Loader from "../layouts/Loader";
import Header from "../layouts/Header"; // Placeholder for your Header component
import ReviewCard from "../layouts/ReviewCard"; // Import the new ReviewCard component

// Sub-component: Image Gallery
const ImageGallery = ({ product, selectedImage, setSelectedImage, isZoomed, setIsZoomed, isLiked, setIsLiked }) => {
  const imageUrl = product.images?.[selectedImage]?.url || "https://via.placeholder.com/500x500";
  const navigate = useNavigate();

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (err) {
      console.error("Sharing failed:", err);
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="aspect-square cursor-zoom-in relative overflow-hidden"
          onClick={() => setIsZoomed(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIsZoomed(true)}
          aria-label="Zoom image"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={imageUrl}
              alt={product.name || "Product image"}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>

          {product.images && product.images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </motion.button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {selectedImage + 1} / {product.images.length}
              </div>
            </>
          )}

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={false}
          >
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Click to Zoom
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute top-6 right-6 flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label={isLiked ? "Unlike product" : "Like product"}
          >
            <Heart
              size={24}
              className={`${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"} transition-colors`}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Share product"
          >
            <Share2 size={24} className="text-gray-700" />
          </motion.button>
        </div>
      </motion.div>

      {product.images && product.images.length > 1 && (
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-5 gap-3 overflow-x-auto scrollbar-hide">
            {product.images.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(i)}
                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-4 transition-all ${selectedImage === i
                  ? "border-indigo-500 shadow-lg ring-2 ring-indigo-300"
                  : "border-white shadow hover:shadow-md"
                  }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedImage(i)}
                aria-label={`Select image ${i + 1}`}
              >
                <img src={item.url} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                {selectedImage === i && (
                  <motion.div className="absolute inset-0 bg-indigo-500/20" layoutId="selectedBorder" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 cursor-zoom-out p-4"
            onClick={() => setIsZoomed(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-label="Zoomed image modal"
          >
            <motion.img
              src={imageUrl}
              alt={product.name || "Product image"}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", damping: 25 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Sub-component: Product Info
const ProductInfo = ({ product, quantity, setQuantity, addToCart }) => {
  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Premium Quality</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
      </motion.div>

      <motion.div
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`${i < Math.floor(product.ratings || 0) ? "text-white fill-white" : "text-white/40"}`}
            />
          ))}
          <span className="ml-2 text-white font-bold">{product.ratings || 0}</span>
        </div>
        <span className="text-gray-600 font-medium">({product.numOfReviews || 0} Reviews)</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6"
      >
        <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ₹{product.price?.toLocaleString("en-IN") || "0"}
          </span>
          <span className="text-2xl text-gray-400 line-through">
            ₹{((product.price || 0) * 1.3).toLocaleString("en-IN")}
          </span>
        </div>

        <motion.p
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : "✗ Out of Stock"}
        </motion.p>
      </motion.div>

      {/* Quantity Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="flex items-center gap-6"
      >
        <span className="text-lg font-semibold text-gray-700">Quantity:</span>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="bg-indigo-100 text-indigo-600 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={20} />
          </motion.button>

          <motion.input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={product.stock}
            className="w-20 text-center text-lg font-bold text-gray-900 border-2 border-indigo-200 rounded-xl py-2 focus:outline-none focus:border-indigo-500"
            aria-label="Product quantity"
          />

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.9 }}
            onClick={handleIncrement}
            disabled={quantity >= product.stock}
            className="bg-indigo-100 text-indigo-600 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={20} />
          </motion.button>
        </div>

        <motion.span
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Max: {product.stock}
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product, quantity)}
          disabled={product.stock === 0}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Add ${quantity} items to cart`}
        >
          <ShoppingCart size={24} />
          Add to Cart ({quantity})
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200"
      >
        {[
          { icon: TruckIcon, text: "Free Delivery" },
          { icon: ShieldCheck, text: "Secure Payment" },
          { icon: RefreshCw, text: "Easy Returns" },
        ].map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className="bg-indigo-100 p-3 rounded-full">
              <feature.icon size={24} className="text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">{feature.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Sub-component: Suggested Products
const SuggestedProducts = ({ suggestedProducts }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {suggestedProducts.map((item, index) => (
          <motion.div
            onClick={() => navigate(`/product/${item._id}`)}
            key={item._id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + index * 0.1 }}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/product/${item._id}`)}
            aria-label={`View product ${item.name}`}
          >
            <div className="relative overflow-hidden aspect-square">
              <motion.img
                src={item.images?.[0]?.url || "https://via.placeholder.com/300"}
                alt={item.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
                {item.name}
              </h3>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${i < Math.floor(item.ratings || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-600">({item.ratings || 0})</span>
              </div>
              <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ₹{item.price?.toLocaleString("en-IN") || "0"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Component
const ProductDetails = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((state) => state.products || { products: [], loading: false, error: null });

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    setSelectedImage(0);
    setIsLiked(false);
    setQuantity(1); // Reset quantity when product changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const product = products.find((p) => p._id === id) || {};
  const suggestedProducts = products.filter((p) => p._id !== id).slice(0, 4);

  const addToCart = (product, quantity) => {
    // Placeholder for adding to cart; integrate with Redux or context
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // You can integrate with your cart system here
    // dispatch(addToCartAction(product, quantity));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-red-500 text-xl font-semibold">Error: {error}</p>
          <button
            onClick={() => dispatch(getProducts())}
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg"
            aria-label="Retry loading products"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  if (!product._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className="text-gray-500 text-xl font-semibold">Product not found</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg"
            aria-label="Go back to home"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header Section */}
      <Header />

      <div className="max-w-7xl mx-auto py-12 px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ImageGallery
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            isZoomed={isZoomed}
            setIsZoomed={setIsZoomed}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
          />
          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            addToCart={addToCart}
          />
        </motion.div>

        <ReviewCard product={product} /> {/* Use the new ReviewCard component */}

        {suggestedProducts.length > 0 && <SuggestedProducts suggestedProducts={suggestedProducts} />}
      </div>
    </div>
  );
};

export default ProductDetails;