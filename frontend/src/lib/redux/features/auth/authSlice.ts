// import { createSlice } from "@reduxjs/toolkit";
// import { userInfo } from "os";

// type AuthState = {
//   userInfo: null | {
//     token: string;
//     isAdmin: boolean;
//   };
// };

// const initialState: AuthState = {
//   userInfo: localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo")!)
//     : null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.userInfo = action.payload;
//       localStorage.setItem("userInfo", JSON.stringify(action.payload));
//     },
//     logout: (state) => {
//       state.userInfo = null;
//       localStorage.removeItem("userInfo");
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;

// export default authSlice.reducer;
