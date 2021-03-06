import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER
} from "../_actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, login: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case AUTH_USER:
      return { ...state, auth: action.payload };
    case ADD_TO_CART_USER:
      return {
        ...state,
        auth: { ...state.auth, cart: action.payload }
      };
    case REMOVE_CART_ITEM_USER:
      return {
        ...state,
        auth: { ...state.auth, cart: action.payload.cart },
        cartDetail: action.payload.cartDetail
      };
    case GET_CART_ITEMS_USER:
      return { ...state, cartDetail: action.payload };
    case ON_SUCCESS_BUY_USER:
      return {
        ...state,
        auth: { ...state.auth, cart: action.payload.cart },
        cartDetail: action.payload.cartDetail
      };
    default:
      return state;
  }
}
