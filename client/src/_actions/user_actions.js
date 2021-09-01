import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER
} from "./types";
import { USER_SERVER } from "../modules/utils/Config";

// 유저 회원가입

export function registerUser(dataToSubmit) {
  // POST를 통해 dataToSubmit을 서버에 전송하고 이에 대한 요청을 받는다.
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    // 문제: 에러 처리를 어떻게 해 줄 것인가?
    // 우선 dispatch 받아오면서 에러를 처리해줌
    // 원래 이러한 비동기 처리는 redux-saga가 전담해야함
    .then((response) => response.data);

  // RegisterPage에서 dispatch에서 응답받은 res를 출력하면, 아래 리턴과 같이 출력된다.
  return {
    type: REGISTER_USER,
    payload: request
  };
}

// 유저 로그인

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
}

// cart
export function addToCart(_id) {
  const request = axios
    .get(`${USER_SERVER}/addToCart?productId=${_id}`)
    .then((response) => response.data);

  return {
    type: ADD_TO_CART_USER,
    payload: request
  };
}

// cartDetail
export function getCartItems(cartItems, userCart) {
  const request = axios
    .get(`/api/product/products_by_id?id=${cartItems}&type=array`)
    .then((response) => {
      //Make CartDetail inside Redux Store
      // We need to add quantity data to Product Information that come from Product Collection.

      userCart.forEach((cartItem) => {
        response.data.forEach((productDetail, i) => {
          if (cartItem.id === productDetail._id) {
            response.data[i].quantity = cartItem.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    type: GET_CART_ITEMS_USER,
    payload: request
  };
}

export function removeCartItem(id) {
  const request = axios
    .get(`/api/users/removeFromCart?_id=${id}`)
    .then((response) => {
      response.data.cart.forEach((item) => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: REMOVE_CART_ITEM_USER,
    payload: request
  };
}
