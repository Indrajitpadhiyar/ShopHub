import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "./redux/reducer/product.Reducer";
import cartReducer from "./redux/slices/cartSlice";
import { userReducer } from "./redux/reducer/user.Reducer";
import {
  myOrdersReducer,
  createOrderReducer,
} from "./redux/reducer/orderReducer";
import wishlistReducer from "./redux/slices/wishlistSlice";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  myOrders: myOrdersReducer,
  createOrder: createOrderReducer,
});

let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
