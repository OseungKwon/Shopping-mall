import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    /* 회원 인증 */

    // 유저 회원가입
    case REGISTER_USER:
      return { ...state, register: action.payload };
    // 유저 로그인
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };

    /* 쇼핑 카트 */

    case ADD_TO_CART_USER:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };
    case GET_CART_ITEMS_USER:
      return {
        ...state,
        cartDetail: action.payload
      };
    case REMOVE_CART_ITEM_USER:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        }
      };
    default:
      return state;
  }
}
