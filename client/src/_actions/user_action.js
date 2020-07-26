import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  AUTH_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_ITEM_USER
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
    .get(`${USER_SERVER}/addToCart?productId=${id}`)
    .then(res => res.data);

  return { type: ADD_TO_CART_USER, payload: request };
}

export function removeItem(id) {
  const request = axios
    .get(`${USER_SERVER}/removeItem?productId=${id}`)
    .then(res => {
      res.data.cart.forEach(item => {
        res.data.cartDetail.forEach((product, idx) => {
          if (item.id === product._id) {
            res.data.cartDetail[idx].quantity = item.quantity;
          }
        });
      });
      return res.data;
    });

  return { type: REMOVE_ITEM_USER, payload: request };
}

export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then(res => {
      // console.log("res.data:", res.data);
      // Make cartDetail inside redux store
      // we need to add quantity data to product information that come from product collection
      userCart.forEach(cartItem => {
        res.data.product.forEach((productDetail, idx) => {
          if (cartItem.id === productDetail._id) {
            res.data.product[idx].quantity = cartItem.quantity;
          }
        });
      });
      return res.data.product;
    });
  return { type: GET_CART_ITEMS_USER, payload: request };
}
