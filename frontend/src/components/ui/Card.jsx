// src/components/ui/Card.jsx
import React, { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AddToCartModal from "./AddToCartModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cart.action";

const Card = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    if (!product) return null;

    const imageUrl = product.images?.[0]?.url || "https://via.placeholder.com/400x300?text=No+Image";
    const inStock = product.stock > 0;
    const rating = product.ratings || 0;

    const handleCardClick = (e) => {
        if (e.target.closest(".add-to-cart-btn")) return;
        navigate(`/product/${product._id}`);
    };

    const handleAdd = async (qty) => {
        try {
            await dispatch(
                addToCart({
                    productId: product._id,
                    quantity: qty,
                    product: {
                        name: product.name,
                        price: product.price,
                        images: product.images,
                        stock: product.stock
                    }
                })
            ).unwrap();

            setModalOpen(false);
        } catch (error) {
            alert("Failed to add to cart!");
            console.error(error);
        }
    };

    return (
        <>
            <motion.div
                onClick={handleCardClick}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-400 cursor-pointer"
                whileHover={{ y: -5 }}
            >
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                {/* Image */}
                <div className="relative overflow-hidden bg-gray-50">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    {!inStock && (
                        <motion.div
                            className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                        >
                            Out of Stock
                        </motion.div>
                    )}
                </div>

                {/* Info */}
                <div className="p-5">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14 group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                    key={s}
                                    className={`w-4 h-4 ${s <= Math.floor(rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-400">({product.numOfReviews || 0})</span>
                    </div>

                    {/* Price + Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="transition-transform duration-300 group-hover:scale-105">
                            <p className="text-xs text-gray-500 mb-0.5">Price</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{product.price?.toLocaleString("en-IN") || 0}
                            </p>
                        </div>

                        {inStock && (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setModalOpen(true);
                                }}
                                className="add-to-cart-btn p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Modal */}
            <AddToCartModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                product={product}
                onConfirm={handleAdd}
            />
        </>
    );
};

export default Card;