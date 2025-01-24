import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpForm: {
    id: "",
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    gender: "",
    termsAgreed: false,
    privacyAgreed: false,
    marketingAgreed: false,
  },
  showSignUpDialog: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setSignUpformData: (state, action) => {
      const { name, value } = action.payload;
      state.signUpForm = {
        ...state.signUpForm,
        [name]: value,
      };
    },
    setSignUpDialog: (state, action) => {
      state.showSignUpDialog = action.payload;
    },
  },
});

export const { setSignUpformData, setSignUpDialog } = signUpSlice.actions;

export default signUpSlice.reducer;
