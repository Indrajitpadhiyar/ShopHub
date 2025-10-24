// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "./src/actions/cart.action.js";

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCartErrors: (state) => {
      state.error = null;
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify([]));
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;

        // Check if item already exists in cart
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item._id === newItem._id
        );

        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          state.cartItems[existingItemIndex].quantity += newItem.quantity;
        } else {
          // Add new item
          state.cartItems.push(newItem);
        }

        // Update localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE QUANTITY
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, quantity } = action.payload;

        const itemIndex = state.cartItems.findIndex(
          (item) => item._id === productId
        );

        if (itemIndex >= 0) {
          if (quantity > 0) {
            state.cartItems[itemIndex].quantity = quantity;
          } else {
            // Remove if quantity is 0
            state.cartItems.splice(itemIndex, 1);
          }

          // Update localStorage
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE FROM CART
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        const productId = action.payload;

        state.cartItems = state.cartItems.filter(
          (item) => item._id !== productId
        );

        // Update localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartErrors, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
