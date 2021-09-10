import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.userData = action.payload;
    },
    postData: (state) => {
      state.loading = true;
    },
    postDataSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    postDataFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.err = action.payload;
    }
  }
});
export const { authUser, postData, postDataSuccess, postDataFailure } =
  authSlice.actions;
export default authSlice.reducer;
