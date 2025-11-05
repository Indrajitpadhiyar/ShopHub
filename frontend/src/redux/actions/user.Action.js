import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  CLEAR_ERRORS,
} from "../constans/user.Constans";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST });

    const token = localStorage.getItem("token");

    if (!token) {
      dispatch({ type: USER_LOAD_FAIL });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Replace with your actual API endpoint
    const { data } = await axios.get(`/api/v1/me`, config);

    dispatch({ type: USER_LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    // If token is invalid, remove it
    localStorage.removeItem("token");
    dispatch({
      type: USER_LOAD_FAIL,
      payload: error.response?.data?.message || "Failed to load user",
    });
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    // Store token in localStorage
    localStorage.setItem("token", data.token);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post("/api/v1/register", userData, config);

    localStorage.setItem("token", data.token);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    // Remove token from localStorage
    localStorage.removeItem("token");

    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response?.data?.message || "Logout failed",
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
