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

// Load cart items from localStorage for initial state
const loadCartFromStorage = () => {
  try {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (error) {
    return [];
  }
};

const loadShippingInfoFromStorage = () => {
  try {
    const shippingInfo = localStorage.getItem("shippingInfo");
    return shippingInfo ? JSON.parse(shippingInfo) : {};
  } catch (error) {
    return {};
  }
};

const initialState = {
  cartItems: loadCartFromStorage(),
  shippingInfo: loadShippingInfoFromStorage(),
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
    case UPDATE_CART_QUANTITY_REQUEST:
    case CLEAR_CART_REQUEST:
    case GET_CART_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_TO_CART_SUCCESS:
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (existingItem) {
        // If item exists, update quantity
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((i) =>
            i.product === existingItem.product
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      } else {
        // If item doesn't exist, add new item
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case UPDATE_CART_QUANTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item.product === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [],
      };

    case GET_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case ADD_TO_CART_FAIL:
    case REMOVE_CART_ITEM_FAIL:
    case UPDATE_CART_QUANTITY_FAIL:
    case CLEAR_CART_FAIL:
    case GET_CART_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_CART_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
