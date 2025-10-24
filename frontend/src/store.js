// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { productReducer } from "./reducer/Product.Reducer";
import cartReducer from "../cartSlice";
import { authReducer } from "./reducer/auth.reducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer, 
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), 
});
export default store;
