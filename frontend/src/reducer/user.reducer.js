import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  UPDATE_ADDRESS_REQUEST,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAIL,
} from "../constans/user.constants";

export const profileReducer = (
  state = { loading: false, user: null, error: null },
  action
) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
    case UPDATE_ADDRESS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PROFILE_SUCCESS:
    case UPDATE_ADDRESS_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case GET_PROFILE_FAIL:
    case UPDATE_ADDRESS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
