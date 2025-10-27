import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { productReducer } from "./reducer/Product.Reducer";
import { userReducer } from "./reducer/user.reducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: import.meta.env.MODE !== "production",
});

export default store;
