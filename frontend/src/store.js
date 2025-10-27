import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { productReducer } from "./reducer/Product.Reducer";
import cartReducer from "../cartSlice";
import { authReducer } from "./reducer/auth.reducer";
import { profileReducer } from "./reducer/user.reducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    user: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: import.meta.env.MODE !== "production",
});

export default store;
