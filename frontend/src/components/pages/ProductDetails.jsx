import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Star,
    Heart,
    ChevronLeft,
    ChevronRight,
    Shield,
} from "lucide-react";
import {
    getProductDetails,
    clearErrors,
} from "../../redux/actions/product.Action";
import { addToCart } from "../../redux/slices/cartSlice";
import {
    addToWishlist,
    removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import toast from "react-hot-toast";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import ReviewSection from "../layouts/ReviewSection";
import MetaData from "../ui/MetaData";
import { CheckoutModal } from "../layouts/CheckoutButton"; // Fixed Import

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { loading, product, error } = useSelector((state) => state.productDetails);
    const { isAuthenticated } = useSelector((state) => state.user);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const [selectedImg, setSelectedImg] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
    const [buyNowItem, setBuyNowItem] = useState(null);

    const isWishlisted = wishlistItems?.some((item) => item._id === id);

    useEffect(() => {
        if (id) dispatch(getProductDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [error, dispatch]);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.error("Please login to add to cart");
            return;
        }

        if (product.stock <= 0) {
            toast.error("Out of stock!");
            return;
        }

        setIsAdding(true);
        dispatch(
            addToCart({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.url || "https://via.placeholder.com/400",
                stock: product.stock,
                qty: quantity,
            })
        );

        toast.success("Added to cart!");
        setTimeout(() => setIsAdding(false), 800);
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.error("Please login to proceed");
            return;
        }

        if (product.stock <= 0) {
            toast.error("Out of stock!");
            return;
        }

        const item = {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0]?.url || "https://via.placeholder.com/400",
            qty: quantity,
        };

        setBuyNowItem(item);
        setShowCheckoutPopup(true);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.error("Please login to add to wishlist");
            return;
        }

        if (isWishlisted) {
            dispatch(removeFromWishlist(product._id));
            toast.success("Removed from wishlist");
        } else {
            dispatch(
                addToWishlist({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0]?.url || "https://via.placeholder.com/400",
                })
            );
            toast.success("Added to wishlist");
        }
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
            <MetaData title={`Bagify | ${product.name}`} />
            <Navbar />

            <div className="bg-gray-50 py-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 md:p-6">
                            {/* LEFT: Images */}
                            <div className="md:col-span-5 space-y-3">
                                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                                    <img
                                        src={product.images?.[selectedImg]?.url || "https://via.placeholder.com/400"}
                                        alt={product.name}
                                        className="w-full h-auto object-contain max-h-96"
                                    />
                                </div>

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

                            {/* CENTER: Info */}
                            <div className="md:col-span-5 space-y-4">
                                <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>

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
                                    <span className="text-sm text-blue-600 underline">
                                        {product.numOfReviews || 0} ratings
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-gray-900">
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                            M.R.P: ₹{product.mrp || 2449}
                                        </span>
                                        <span className="text-sm font-semibold text-orange-600">
                                            -
                                            {Math.round(
                                                ((product.mrp || 2449) - product.price) /
                                                (product.mrp || 2449) *
                                                100
                                            )}
                                            %
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-1">Inclusive of all taxes</p>
                                </div>

                                <div className="text-sm">
                                    <p>
                                        <span className="font-medium">EMI</span> starts at ₹78. No Cost EMI available{" "}
                                        <a href="#" className="text-blue-600 underline text-xs">EMI options</a>
                                    </p>
                                </div>

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

                                <div className="text-sm text-gray-700">
                                    <p>{product.description || "No description available."}</p>
                                </div>

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

                                    <p className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                                        {product.stock > 0 ? "In stock" : "Out of stock"}
                                    </p>

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

                                    <div className="space-y-2">
                                        <button
                                            onClick={handleAddToCart}
                                            disabled={product.stock <= 0 || isAdding}
                                            className={`w-full py-2 rounded-md font-medium transition-all ${product.stock <= 0 || isAdding
                                                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                                                : "bg-yellow-400 hover:bg-yellow-500 text-black"
                                                }`}
                                        >
                                            {isAdding ? "Adding..." : "Add to Cart"}
                                        </button>

                                        <button
                                            onClick={handleBuyNow}
                                            disabled={product.stock <= 0}
                                            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-2 rounded-md font-medium transition"
                                        >
                                            Buy Now
                                        </button>
                                    </div>

                                    <button
                                        onClick={handleWishlist}
                                        className={`w-full flex items-center justify-center gap-2 border rounded-md py-2 text-sm font-medium transition-all ${isWishlisted
                                            ? "border-orange-500 bg-orange-50 text-orange-600"
                                            : "border-gray-300 hover:border-orange-500"
                                            }`}
                                    >
                                        <Heart
                                            className={`w-4 h-4 ${isWishlisted ? "fill-orange-500 text-orange-500" : "text-gray-600"}`}
                                        />
                                        {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                                    </button>

                                    <div className="flex items-center gap-1 text-xs text-gray-600">
                                        <Shield className="w-4 h-4" />
                                        <span>Secure transaction</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                        <ReviewSection />
                    </div>
                </div>
            </div>

            {/* BUY NOW CHECKOUT POPUP */}
            <CheckoutModal
                isOpen={showCheckoutPopup}
                onClose={() => {
                    setShowCheckoutPopup(false);
                    setBuyNowItem(null);
                }}
                onSuccess={() => {
                    setBuyNowItem(null);
                }}
                overrideCartItems={buyNowItem ? [buyNowItem] : undefined}
            />

            <Footer />
        </>
    );
};

export default ProductDetails;