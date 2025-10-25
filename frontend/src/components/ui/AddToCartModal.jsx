import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import cartSlice from "../../../cartSlice.js";
import { addToCart as addToCartThunk } from "../../actions/cart.action.js";

const { addToCart: addToCartSlice } = cartSlice;

const AddToCartModal = ({
    product,
    isOpen,
    onClose,
    initialQty = 1,
}) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.cart || {});

    const [qty, setQty] = useState(initialQty);

    useEffect(() => {
        if (isOpen) setQty(initialQty);
    }, [isOpen, initialQty]);

    const handleQtyChange = (newQty) => {
        if (newQty < 1) return;
        if (product.stock && newQty > product.stock) {
            toast.error(`Only ${product.stock} in stock`);
            return;
        }
        setQty(newQty);
    };

    const increment = () => handleQtyChange(qty + 1);
    const decrement = () => handleQtyChange(qty - 1);

    const handleAdd = async () => {
        if (!product?.stock || qty > product.stock) {
            toast.error(`Only ${product.stock} in stock`);
            return;
        }

        const addToCartAction = addToCartSlice || addToCartThunk;

        await dispatch(addToCartAction({ productId: product._id, quantity: qty, product }));
        toast.success(`${qty} × ${product.name} added!`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center gap-4 mb-5">
                        <img
                            src={product.images?.[0] || "/placeholder.jpg"}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-xl font-bold text-emerald-600">${product.price}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm text-gray-600">Quantity</span>
                        <div className="flex items-center border rounded-lg overflow-hidden">
                            <button
                                onClick={decrement}
                                disabled={loading || qty <= 1}
                                className="p-3 hover:bg-gray-100 disabled:opacity-50 transition"
                            >
                                <MinusIcon />
                            </button>
                            <input
                                type="number"
                                value={qty}
                                onChange={(e) => handleQtyChange(Number(e.target.value))}
                                className="w-16 text-center border-x outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                min={1}
                                max={product.stock}
                            />
                            <button
                                onClick={increment}
                                disabled={loading || qty >= product.stock}
                                className="p-3 hover:bg-gray-100 disabled:opacity-50 transition"
                            >
                                <PlusIcon />
                            </button>
                        </div>
                    </div>

                    {product.stock < 10 && product.stock > 0 && (
                        <p className="text-sm text-amber-600 mb-4 text-center">
                            Only {product.stock} left in stock!
                        </p>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            disabled={loading}
                            onClick={handleAdd}
                            className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium
                transition-all duration-200
                ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"}
              `}
                        >
                            {loading ? (
                                <>
                                    <Spinner />
                                    <span>Adding…</span>
                                </>
                            ) : (
                                <>
                                    <CartIcon size={18} />
                                    Add to Cart
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const MinusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const CartIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

const Spinner = () => (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
);

export default AddToCartModal;