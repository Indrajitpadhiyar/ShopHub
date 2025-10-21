import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productReducer } from "./reducer/Product.Reducer";
import { cartReducer } from "./reducer/cart.reducer";
import { authReducer } from "./reducer/auth.reducer";

const reducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
