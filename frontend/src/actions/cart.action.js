import axios from "axios";
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAIL,
  UPDATE_CART_QUANTITY_REQUEST,
  UPDATE_CART_QUANTITY_SUCCESS,
  UPDATE_CART_QUANTITY_FAIL,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAIL,
  GET_CART_ITEMS_REQUEST,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_FAIL,
  SAVE_SHIPPING_INFO,
  CLEAR_CART_ERRORS,
} from "../constans/cart.constans.js";

// Add item to cart
export const addToCart =
  (productId, quantity = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });

      // First get product details
      const { data } = await axios.get(`/api/v1/product/${productId}`);

      const product = data.product;

      const cartItem = {
        product: product._id,
        name: product.name,
        price: product.price,
        image:
          product.images?.[0]?.url ||
          "https://via.placeholder.com/400x300?text=No+Image",
        stock: product.stock,
        quantity: quantity,
        originalPrice: product.originalPrice || product.price,
      };

      dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: cartItem,
      });

      // Save to localStorage after successful addition
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );

      return Promise.resolve("Product added to cart successfully");
    } catch (error) {
      dispatch({
        type: ADD_TO_CART_FAIL,
        payload: error.response?.data?.message || "Failed to add item to cart",
      });
      return Promise.reject(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  };

// Remove item from cart
export const removeFromCart = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });

    dispatch({
      type: REMOVE_CART_ITEM_SUCCESS,
      payload: productId,
    });

    // Update localStorage after successful removal
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );

    return Promise.resolve("Item removed from cart successfully");
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAIL,
      payload:
        error.response?.data?.message || "Failed to remove item from cart",
    });
    return Promise.reject(
      error.response?.data?.message || "Failed to remove item from cart"
    );
  }
};

// Update cart item quantity
export const updateCartQuantity =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CART_QUANTITY_REQUEST });

      if (quantity < 1) {
        throw new Error("Quantity cannot be less than 1");
      }

      dispatch({
        type: UPDATE_CART_QUANTITY_SUCCESS,
        payload: {
          productId,
          quantity,
        },
      });

      // Update localStorage after successful quantity update
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );

      return Promise.resolve("Cart quantity updated successfully");
    } catch (error) {
      dispatch({
        type: UPDATE_CART_QUANTITY_FAIL,
        payload:
          error.response?.data?.message ||
          error.message ||
          "Failed to update cart quantity",
      });
      return Promise.reject(
        error.response?.data?.message ||
          error.message ||
          "Failed to update cart quantity"
      );
    }
  };

// Clear entire cart
export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CART_REQUEST });

    dispatch({
      type: CLEAR_CART_SUCCESS,
    });

    // Remove cart items from localStorage
    localStorage.removeItem("cartItems");

    return Promise.resolve("Cart cleared successfully");
  } catch (error) {
    dispatch({
      type: CLEAR_CART_FAIL,
      payload: error.response?.data?.message || "Failed to clear cart",
    });
    return Promise.reject(
      error.response?.data?.message || "Failed to clear cart"
    );
  }
};

// Get cart items from localStorage (for persistent cart)
export const getCartItems = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_ITEMS_REQUEST });

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    dispatch({
      type: GET_CART_ITEMS_SUCCESS,
      payload: cartItems,
    });

    return Promise.resolve("Cart items loaded successfully");
  } catch (error) {
    dispatch({
      type: GET_CART_ITEMS_FAIL,
      payload: error.response?.data?.message || "Failed to load cart items",
    });
    return Promise.reject(
      error.response?.data?.message || "Failed to load cart items"
    );
  }
};

// Save shipping information
export const saveShippingInfo = (shippingData) => async (dispatch) => {
  try {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: shippingData,
    });

    // Save to localStorage for persistence
    localStorage.setItem("shippingInfo", JSON.stringify(shippingData));

    return Promise.resolve("Shipping information saved successfully");
  } catch (error) {
    return Promise.reject("Failed to save shipping information");
  }
};

// Clear cart errors
export const clearCartErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART_ERRORS,
  });
};

// Helper function to check if product is in cart
export const isProductInCart = (productId) => (_, getState) => {
  const { cartItems } = getState().cart;
  return cartItems.some((item) => item.product === productId);
};

// Helper function to get cart item quantity
export const getCartItemQuantity = (productId) => (_, getState) => {
  const { cartItems } = getState().cart;
  const cartItem = cartItems.find((item) => item.product === productId);
  return cartItem ? cartItem.quantity : 0;
};

// Bulk update cart items (for syncing with server)
export const syncCartWithServer = (cartItems) => async (dispatch) => {
  try {
    // This would typically make an API call to sync the cart with the server
    // For now, we'll just update the local storage and state

    dispatch({
      type: GET_CART_ITEMS_SUCCESS,
      payload: cartItems,
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    return Promise.resolve("Cart synced successfully");
  } catch (error) {
    return Promise.reject("Failed to sync cart with server");
  }
};
