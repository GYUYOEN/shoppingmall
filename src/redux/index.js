// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./signUpSlice";
import inputErrorSlice from "./inputErrorSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpSlice,
    error: inputErrorSlice,
  },
});
