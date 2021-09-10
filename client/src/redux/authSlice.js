import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    loading: false,
    success: false
  }
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.userData = action.payload;
    },
    registerData: (state) => {
      state.userData.loading = true;
    },
    registerDataSuccess: (state) => {
      state.userData.loading = false;
      state.userData.success = true;
    },
    registerDataFailure: (state, action) => {
      state.userData.loading = false;
      state.userData.success = false;
      state.userData.err = action.payload;
    },
    loginData: (state) => {
      state.loading = true;
    },
    loginDataSuccess: (state, action) => {
      state.userData.loading = false;
      state.userData.loginSuccess = true;
      state.userData.userId = action.payload;
    },
    loginDataFailure: (state, action) => {
      state.userData.loading = false;
      state.userData.loginSuccess = false;
      state.userData.err = action.payload;
    }
  }
});
export const {
  authUser,
  registerData,
  registerDataSuccess,
  registerDataFailure,
  loginData,
  loginDataSuccess,
  loginDataFailure
} = authSlice.actions;
export default authSlice.reducer;
