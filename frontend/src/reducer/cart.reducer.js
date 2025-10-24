// src/redux/reducer/cart.reducer.js
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL,
  REMOVE_FROM_CART_SUCCESS,
  UPDATE_QUANTITY_SUCCESS,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_ERRORS,
} from "../constans/cart.constans";

// Load cart from localStorage (fallback to empty array)
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cartItems");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cartItems: loadCartFromStorage(),
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // ── REQUESTS ───────────────────────────────────────
    case ADD_TO_CART_REQUEST:
    case FETCH_CART_REQUEST:
      return { ...state, loading: true, error: null };

    // ── ADD TO CART ───────────────────────────────────
    case ADD_TO_CART_SUCCESS: {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      let newCart;
      if (existItem) {
        newCart = state.cartItems.map((x) =>
          x.product === existItem.product
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        );
      } else {
        newCart = [...state.cartItems, item];
      }

      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return { ...state, loading: false, cartItems: newCart };
    }

    // ── FETCH CART ───────────────────────────────────
    case FETCH_CART_SUCCESS: {
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
      return { ...state, loading: false, cartItems: action.payload };
    }

    // ── REMOVE / UPDATE / CLEAR ───────────────────────
    case REMOVE_FROM_CART_SUCCESS: {
      const filtered = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(filtered));
      return { ...state, cartItems: filtered };
    }

    case UPDATE_QUANTITY_SUCCESS: {
      const updated = state.cartItems.map((x) =>
        x.product === action.payload.productId
          ? { ...x, quantity: action.payload.quantity }
          : x
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return { ...state, cartItems: updated };
    }

    case CLEAR_CART_SUCCESS: {
      localStorage.setItem("cartItems", JSON.stringify([]));
      return { ...state, cartItems: [] };
    }

    // ── ERRORS ───────────────────────────────────────
    case ADD_TO_CART_FAIL:
    case FETCH_CART_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CLEAR_CART_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
