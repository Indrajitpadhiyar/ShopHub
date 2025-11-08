// src/redux/reducers/orderReducer.js (Update)
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from "../constans/orderConstants";

export const orderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_MY_ORDERS_REQUEST:
      return { ...state, loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case GET_MY_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case CREATE_ORDER_FAIL:
    case GET_MY_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
