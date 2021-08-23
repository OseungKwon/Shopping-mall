import { createAction, handleActions } from 'redux-actions';
import { USER_SERVER } from './utils/Config';
import axios from 'axios';

const LOGIN_USER = 'auth/LOGIN_USER'
const REGISTER_USER = 'auth/REGISTER_USER'
const AUTH_USER = 'auth/AUTH_USER'


export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}
export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

const user = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        default:
            return state;
    }
}
export default user;