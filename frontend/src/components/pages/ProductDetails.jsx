import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Truck, Shield, CreditCard } from "lucide-react";
import { getProductDetails, clearErrors } from "../../redux/actions/product.Action";
import toast from "react-hot-toast";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import ReviewSection from "../layouts/ReviewSection";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, product, error } = useSelector((state) => state.productDetails);

    const [selectedImg, setSelectedImg] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) dispatch(getProductDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [error, dispatch]);

    const handleAddToCart = () => {
        if (!product || product.stock < quantity) return;
        toast.success(`${quantity} × ${product.name} added to cart!`);
    };

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted);
        toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
                    Product not found
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 md:p-6">
                            {/* LEFT: Images */}
                            <div className="md:col-span-5 space-y-3">
                                {/* Main Image */}
                                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                                    <img
                                        src={product.images?.[selectedImg]?.url || "https://via.placeholder.com/400"}
                                        alt={product.name}
                                        className="w-full h-auto object-contain max-h-96"
                                    />
                                </div>

                                {/* Thumbnails */}
                                {product.images && product.images.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {product.images.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedImg(i)}
                                                className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden transition-all ${selectedImg === i ? "border-orange-500" : "border-gray-300"
                                                    }`}
                                            >
                                                <img src={img.url} alt="" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* CENTER: Product Info */}
                            <div className="md:col-span-5 space-y-4">
                                <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>

                                {/* Ratings */}
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.ratings || 0)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-blue-600 underline">{product.numOfReviews || 0} ratings</span>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-gray-900">
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">M.R.P: ₹{product.mrp || 2449}</span>
                                        <span className="text-sm font-semibold text-orange-600">
                                            -{Math.round(((product.mrp || 2449) - product.price) / (product.mrp || 2449) * 100)}%
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">Inclusive of all taxes</p>
                                </div>

                                {/* EMI */}
                                <div className="text-sm">
                                    <p>
                                        <span className="font-medium">EMI</span> starts at ₹78. No Cost EMI available{" "}
                                        <a href="#" className="text-blue-600 underline text-xs">EMI options</a>
                                    </p>
                                </div>

                                {/* Offers */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs text-red-600 font-bold">%</span>
                                        </div>
                                        <p>
                                            <strong>Bank Offer:</strong> Upto ₹1,000 discount on Credit Cards{" "}
                                            <a href="#" className="text-blue-600 underline text-xs">7 offers</a>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-xs text-green-600 font-bold">₹</span>
                                        </div>
                                        <p>
                                            <strong>Cashback:</strong> Upto ₹47.00 cashback as Amazon Pay Balance
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="text-sm text-gray-700">
                                    <p>{product.description || "No description available."}</p>
                                </div>

                                {/* Features */}
                                {product.features && product.features.length > 0 && (
                                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                                        {product.features.map((feat, i) => (
                                            <li key={i}>{feat}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* RIGHT: Buy Box */}
                            <div className="md:col-span-2">
                                <div className="border border-gray-300 rounded-md p-4 space-y-4">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </p>
                                        <p className="text-xs text-green-600 mt-1">
                                            FREE delivery <strong>Sunday, 2 November</strong>. Details
                                        </p>
                                        <p className="text-xs text-orange-600">
                                            Or fastest delivery <strong>Tomorrow, 1 November</strong>. Order within 6 hrs 19 mins.
                                        </p>
                                    </div>

                                    <p
                                        className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {product.stock > 0 ? "In stock" : "Out of stock"}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Ships from <span className="font-medium">Amazon</span>
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Sold by <span className="font-medium">Clicktech Retail Private Ltd</span>
                                    </p>

                                    {/* Quantity */}
                                    <div className="flex items-center border border-gray-300 rounded-md w-full">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-1 hover:bg-gray-100"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <span className="px-3 text-sm font-medium">Qty: {quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="p-1 hover:bg-gray-100"
                                            disabled={quantity >= product.stock}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Buttons */}
                                    <div className="space-y-2">
                                        <button
                                            onClick={handleAddToCart}
                                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 rounded-md transition"
                                        >
                                            Add to Cart
                                        </button>
                                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-md transition">
                                            Buy Now
                                        </button>
                                    </div>

                                    {/* Wishlist */}
                                    <button
                                        onClick={handleWishlist}
                                        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm hover:border-orange-500 transition"
                                    >
                                        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-orange-500 text-orange-500" : ""}`} />
                                        {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                                    </button>

                                    {/* Secure Transaction */}
                                    <div className="flex items-center gap-1 text-xs text-gray-600">
                                        <Shield className="w-4 h-4" />
                                        <span>Secure transaction</span>
                                    </div>
                                </div>

                                {/* Extra Protection */}
                                {/* <div className="mt-4 border border-gray-200 rounded-md p-3 text-xs">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded" />
                                        <span>Add a Protection Plan:</span>
                                    </label>
                                    <label className="flex items-center gap-2 mt-1 cursor-pointer">
                                        <input type="checkbox" />
                                        <span className="text-orange-600">Extended Warranty for ₹205.00</span>
                                    </label>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                        <ReviewSection />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;