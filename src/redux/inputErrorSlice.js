import { createSlice } from "@reduxjs/toolkit";

const validateField = (name, value, formData = {}) => {
  let error = "";

  switch (name) {
    case "id":
      if (!value) {
        error = "아이디를 입력해주세요.";
      } else if (value.length < 4) {
        error = "아이디는 4자 이상이어야 합니다.";
      }
      break;

    case "email":
      // eslint-disable-next-line no-case-declarations
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = "이메일을 입력해주세요.";
      } else if (!emailRegex.test(value)) {
        error = "올바른 이메일 형식이 아닙니다.";
      }
      break;

    case "name":
      if (!value) {
        error = "이름을 입력해주세요.";
      }
      break;

    case "password":
      if (!value) {
        error = "비밀번호를 입력해주세요.";
      } else if (value.length < 8) {
        error = "비밀번호는 8자 이상이어야 합니다.";
      } else if (!/[0-9]/.test(value)) {
        error = "비밀번호에 숫자가 포함되어야 합니다.";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        error = "비밀번호에 특수문자가 포함되어야 합니다.";
      }
      break;

    case "passwordConfirm":
      if (!value) {
        error = "비밀번호 확인을 입력해주세요.";
      } else if (value !== formData.password) {
        error = "비밀번호가 일치하지 않습니다.";
      }
      break;

    case "phone":
      // eslint-disable-next-line no-case-declarations
      const phoneRegex = /^[0-9]{3}[0-9]{4}[0-9]{4}$/;
      if (!value) {
        error = "전화번호를 입력해주세요.";
      } else if (!phoneRegex.test(value)) {
        error = "올바른 전화번호 형식이 아닙니다. (예: 01012345678)";
      }
      break;

    case "gender":
      if (!value) {
        error = "성별을 선택해주세요.";
      }
      break;

    case "address":
      if (!value) {
        error = "우편번호와 주소를 입력해주세요";
      }
      break;

    case "detailAddress":
      if (!value) {
        error = "상세주소를 입력해주세요";
      }
      break;

    default:
      break;
  }
  return error;
};

const initialState = {
  errors: {},
};

const inputErrorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setFieldError: (state, action) => {
      const { field, value, formData } = action.payload;
      const error = validateField(field, value, formData);
      state.errors = {
        ...state.errors,
        [field]: error,
      };
    },
  },
});

export const { setFieldError } = inputErrorSlice.actions;

export default inputErrorSlice.reducer;
