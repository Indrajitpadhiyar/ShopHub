// src/components/CartNotification.jsx
import React from "react";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const selectCartItems = (state) => state.cart?.items || [];

const CartNotification = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);

    const cartItemCount = React.useMemo(() => {
        if (!Array.isArray(cartItems)) return 0;
        return cartItems.reduce((sum, item) => sum + (parseInt(item?.quantity) || 1), 0);
    }, [cartItems]);

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/AddToCart");
    };

    return (
        <a
            href="/AddToCart"
            onClick={handleClick}
            className="relative p-2.5 rounded-full hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
            aria-label={`Cart with ${cartItemCount} items`}
        >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg z-10 border-2 border-white">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
            )}
        </a>
    );
};

export default CartNotification;