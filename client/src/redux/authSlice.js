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
    postData: (state) => {
      state.userData.loading = true;
    },
    postDataSuccess: (state) => {
      state.userData.loading = false;
      state.userData.success = true;
    },
    postDataFailure: (state, action) => {
      state.userData.loading = false;
      state.userData.success = false;
      state.userData.err = action.payload;
    }
  }
});
export const { authUser, postData, postDataSuccess, postDataFailure } =
  authSlice.actions;
export default authSlice.reducer;
