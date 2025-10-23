import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, addToCart } from "../../actions/product.action";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state) => state.products);
    const { cartItems, isAuthenticated } = useSelector((state) => state.cart);

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please log in to view products");
            navigate("/login");
        } else if (!products.length) {
            dispatch(getProducts()).catch((err) => toast.error(err));
        }
    }, [dispatch, isAuthenticated, navigate, products.length]);

    const handleAddToCart = (productId) => {
        if (!isAuthenticated) {
            toast.error("Please log in to add items to cart");
            navigate("/login");
            return;
        }
        dispatch(addToCart(productId, 1))
            .then(() => toast.success("Item added to cart!"))
            .catch((err) => toast.error(err));
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-6 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:text-3xl">Products</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                    >
                        <div className="relative aspect-square overflow-hidden">
                            <img
                                src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-3 md:p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 md:text-base">{product.name}</h3>
                            <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent md:text-xl">
                                ₹{product.price?.toLocaleString("en-IN") || "0"}
                            </p>
                            <button
                                onClick={() => handleAddToCart(product._id)}
                                disabled={cartItems.some((item) => item.product === product._id)}
                                className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-1 px-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1 text-xs md:py-2 md:px-4 md:text-sm md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                                {cartItems.some((item) => item.product === product._id) ? "Added" : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;