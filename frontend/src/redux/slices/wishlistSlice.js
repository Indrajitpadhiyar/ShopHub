// src/redux/slices/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  wishlistItems: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const exist = state.wishlistItems.find((x) => x._id === item._id);
      if (!exist) {
        state.wishlistItems.push(item);
        toast.success("Added to wishlist");
      } else {
        toast.info("Already in wishlist");
      }
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (x) => x._id !== action.payload
      );
      toast.error("Removed from wishlist");
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
