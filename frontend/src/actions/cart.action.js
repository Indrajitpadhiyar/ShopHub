// src/actions/cart.action.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// === ADD TO CART ===
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, product }, { rejectWithValue }) => {
    try {
      await delay(600);

      // Create cart item with proper structure
      const cartItem = {
        _id: productId,
        product: productId, // For compatibility with your reducer
        quantity,
        name: product.name,
        price: product.price,
        images: product.images,
        stock: product.stock,
      };

      return cartItem;
    } catch (error) {
      return rejectWithValue("Failed to add to cart");
    }
  }
);

// === UPDATE QUANTITY ===
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await delay(300);
      return { productId, quantity };
    } catch (error) {
      return rejectWithValue("Failed to update quantity");
    }
  }
);

// === REMOVE FROM CART ===
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      await delay(300);
      return productId;
    } catch (error) {
      return rejectWithValue("Failed to remove item");
    }
  }
);
