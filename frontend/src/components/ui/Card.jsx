// src/components/ui/Card.jsx
import React, { useState, useEffect } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

const Card = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [bgColor, setBgColor] = useState("#f1f5f9"); // fallback
    const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0.12)");

    if (!product) return null;

    const imageUrl = product.images?.[0]?.url || "https://via.placeholder.com/400x300?text=No+Image";
    const inStock = product.stock > 0;
    const rating = product.ratings || 0;

    useEffect(() => {
        const extractColor = async () => {
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const img = new Image();
                img.crossOrigin = "anonymous";

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = 150; 
                    canvas.height = 150;
                    ctx.drawImage(img, 0, 0, 150, 150);

                    const imageData = ctx.getImageData(0, 0, 150, 150);
                    const dominant = getDominantNonWhiteNonBlackColor(imageData);

                    const r = dominant[0], g = dominant[1], b = dominant[2];

                    // Light background tint
                    setBgColor(`rgb(${r}, ${g}, ${b})`);

                    // Stronger, bigger shadow (skip black/white)
                    setShadowColor(`rgba(${r}, ${g}, ${b}, 0.3)`);
                };

                img.src = URL.createObjectURL(blob);
            } catch (error) {
                console.error("Color extraction failed:", error);
                setBgColor("#f1f5f9");
                setShadowColor("rgba(0, 0, 0, 0.12)");
            }
        };

        extractColor();
    }, [imageUrl]);

    // Skip White & Black
    const getDominantNonWhiteNonBlackColor = (imageData) => {
        const data = imageData.data;
        let rSum = 0, gSum = 0, bSum = 0;
        let count = 0;

        const WHITE_THRESHOLD = 230;
        const BLACK_THRESHOLD = 30;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];

            // Skip white
            if (r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD) continue;
            // Skip black
            if (r < BLACK_THRESHOLD && g < BLACK_THRESHOLD && b < BLACK_THRESHOLD) continue;

            rSum += r; gSum += g; bSum += b;
            count++;
        }

        if (count === 0) return [100, 150, 255]; // fallback blue

        return [
            Math.floor(rSum / count),
            Math.floor(gSum / count),
            Math.floor(bSum / count)
        ];
    };

    const handleCardClick = (e) => {
        if (e.target.closest(".add-to-cart-btn")) return;
        navigate(`/product/${product._id}`);
    };

    return (
        <motion.div
            onClick={handleCardClick}
            className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer"
            whileHover={{ y: -12 }}
            style={{
                backgroundColor: "#ffffff",
                boxShadow: `0 8px 16px -4px ${shadowColor}, 0 4px 8px -2px ${shadowColor}`,
                transition: "all 0.5s ease",
            }}
            animate={{
                boxShadow: `0 32px 48px -12px ${shadowColor}, 0 16px 24px -8px ${shadowColor}`,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Dynamic Background Tint */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                style={{
                    background: `linear-gradient(135deg, ${bgColor}25 0%, ${bgColor}10 100%)`,
                }}
            />

            {/* Shine */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />

            {/* Image */}
            <div className="relative overflow-hidden bg-gray-50">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
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
            <div className="p-5 relative z-20">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14 group-hover:text-blue-600 transition-colors">
                    {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                className={`w-4 h-4 ${s <= Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{rating.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">({product.numOfReviews || 0})</span>
                </div>

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
                            onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
                            className="add-to-cart-btn p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
                        >
                            <ShoppingCart className="w-5 h-5" />
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Card;