// src/actions/auth.action.js
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constans/auth.constants";
import { toast } from "react-hot-toast";

// Login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/login", // Replace with your actual login API endpoint
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    // Store user info and token in localStorage
    localStorage.setItem("userInfo", JSON.stringify(data.user));
    if (data.token) {
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response?.data?.message || error.message || "Login failed",
    });
  }
};

// Register action
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/register", // Replace with your actual register API endpoint
      { name, email, password },
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });

    // Store user info and token in localStorage
    localStorage.setItem("userInfo", JSON.stringify(data.user));
    if (data.token) {
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    }
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload:
        error.response?.data?.message || error.message || "Registration failed",
    });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  try {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: LOGOUT_SUCCESS });
    toast.success("Logged out successfully");
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.message,
    });
  }
};

// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};