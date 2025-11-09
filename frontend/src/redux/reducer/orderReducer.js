// src/redux/reducers/orderReducer.js
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from "../constans/orderConstants";

// Separate reducer for My Orders
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_MY_ORDERS_REQUEST:
      return { ...state, loading: true };
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case GET_MY_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Optional: Create Order Reducer
export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
