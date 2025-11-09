// src/redux/actions/order.Action.js
import axios from "axios";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  GET_MY_ORDERS_REQUEST,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
} from "../constans/orderConstants";

// Axios instance with base URL + cookies
const API = axios.create({
  baseURL: "http://localhost:4000", // ← CHANGE IF PORT DIFFERENT
  withCredentials: true, // ← COOKIES SEND HO RAHE HAIN
});

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } = await API.post("/api/v1/order/new", order);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_ORDERS_REQUEST });

    const { data } = await API.get("/api/v1/orders/me"); // ← CORRECT URL

    dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: GET_MY_ORDERS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
