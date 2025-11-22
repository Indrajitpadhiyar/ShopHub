import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_RESET,
} from "../constans/addProduct.Constans";

const initialState = {
  loading: false,
  success: false,
  addProduct: null,
  error: null,
};

export const createAddProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        addProduct: action.payload,
        error: null,
      };

    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_PRODUCT_RESET:
      return initialState;

    default:
      return state;
  }
};
