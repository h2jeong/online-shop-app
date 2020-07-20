import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  AUTH_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER
} from "./types";
import axios from "axios";
import { USER_SERVER } from "../components/Config.js";

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(res => res.data);

  return { type: LOGIN_USER, payload: request };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data);

  return { type: REGISTER_USER, payload: request };
}

export function logoutUser() {
  const request = axios.post(`${USER_SERVER}/logout`).then(res => res.data);

  return { type: LOGOUT_USER, payload: request };
}

export function authUser() {
  const request = axios.get(`${USER_SERVER}/auth`).then(res => res.data);

  return { type: AUTH_USER, payload: request };
}

export function addToCart(id) {
  const request = axios
    .post(`${USER_SERVER}/addToCart?productId=${id}`)
    .then(res => {
      return res.data;
    });

  return { type: ADD_TO_CART_USER, payload: request };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then(res => {
      //Make cartDetail inside redux store
      // we need to add quantity data to product information that come from product collection
      userCart.forEach(cartItem => {
        res.data.forEach((productDetail, idx) => {
          if (cartItem.id === productDetail.id) {
            res.data[idx].quantity = cartItem.quantity;
          }
        });
      });
      return res.data;
    });
  return { type: GET_CART_ITEMS_USER, payload: request };
}
