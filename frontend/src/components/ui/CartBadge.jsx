// src/components/ui/CartBadge.jsx
import React from "react";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

const CartBadge = ({ className = "" }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const total = cartItems.reduce((acc, i) => acc + i.quantity, 0);

    return (
        <div className={`relative ${className}`}>
            <ShoppingCart className="w-6 h-6" />
            {total > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {total}
                </span>
            )}
        </div>
    );
};

export default CartBadge;