import axios from "axios";
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_RESET,
} from "../constans/addProduct.Constans";

// Get token from state or localStorage
const token = localStorage.getItem("token"); // or get from userLogin state

export const addProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/api/products/new", productData, config);

    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });

    // Optional: Reset after success
    setTimeout(() => {
      dispatch({ type: ADD_PRODUCT_RESET });
    }, 3000);
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
