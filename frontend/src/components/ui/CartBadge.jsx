// src/components/ui/CartBadge.jsx
import React from "react";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

const CartBadge = ({ className = "" }) => {
    const { cartItems } = useSelector((state) => state.cart);
    const total = cartItems.reduce((acc, i) => acc + i.quantity, 0);

    return (
        <div className={`relative inline-block ${className}`}>
            {/* Big Shopping Cart Icon */}
            <ShoppingCart className="w-7 h-7 text-gray-800 dark:text-gray-300 transition-all duration-200 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400" />

            {/* Badge - Only if items exist */}
            {total > 0 && (
                <span
                    className={`absolute -top-2 -right-2 flex items-center justify-center min-w-[22px] h-5.5 px-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md ring-white transition-all duration-300 ease-out ${total > 99 ? 'text-[10px]' : 'text-xs'}`}
                    style={{
                        animation: total > 0 ? 'popIn 0.3s ease-out' : 'none',
                    }}
                >
                    {total > 99 ? '99+' : total}
                </span>
            )}
        </div>
    );
};

export default CartBadge;