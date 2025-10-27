import axios from "axios";
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
} from "../constans/user.constants";

export const getProfile = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const { data } = await axios.get("/api/v1/me"); 
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateAddress = (addressData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v1/me/update",
      addressData,
      config
    );

    dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: UPDATE_ADDRESS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};