import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, addToCart } from "../../actions/product.action";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Products</h2>
            {products.map((product) => (
                <div
                    key={product._id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        margin: "10px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                    </div>
                    <button
                        onClick={() => handleAddToCart(product._id)}
                        disabled={cartItems.some((item) => item.product === product._id)}
                    >
                        {cartItems.some((item) => item.product === product._id) ? "Added" : "Add to Cart"}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;