import { useDispatch, useSelector } from "react-redux";

import SignUpDialog from "@/components/signup/SignUpDialog";

import { InputForm } from "@/components/common/InputForm";
import { setSignUpformData, setSignUpDialog } from "@/redux/signUpSlice";
import { setFieldError } from "@/redux/inputErrorSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { signUpForm, showSignUpDialog } = useSelector((state) => state.signUp);
  const errors = useSelector((state) => state.error.errors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");

      dispatch(setSignUpformData({ name, value: onlyNumbers }));
    } else {
      dispatch(setSignUpformData({ name, value }));
    }
  };

  const handleError = (e) => {
    dispatch(
      setFieldError({
        field: e.target.name,
        value: e.target.value,
        formData: signUpForm,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSignUpDialog(true));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

        <form onSubmit={handleSubmit}>
          <InputForm
            label="아이디"
            name="id"
            value={signUpForm.id}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.id}
            className="mb-4"
          />

          <InputForm
            label="이메일"
            name="email"
            type="email"
            value={signUpForm.email}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.email}
            className="mb-4"
          />

          <InputForm
            label="이름"
            name="name"
            value={signUpForm.name}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.name}
            className="mb-4"
          />

          <InputForm
            label="비밀번호"
            name="password"
            type="password"
            value={signUpForm.password}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.password}
            className="mb-4"
          />

          <InputForm
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            value={signUpForm.passwordConfirm}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.passwordConfirm}
            className="mb-4"
          />

          <InputForm
            label="전화번호"
            name="phone"
            type="tel"
            value={signUpForm.phone}
            onChange={handleChange}
            onBlur={handleError}
            maxLength={11}
            placeholder="01012345678"
            error={errors.phone}
            className="mb-4"
          />

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">성별</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={signUpForm.gender === "male"}
                  onChange={handleChange}
                  onBlur={handleError}
                  className="mr-2"
                />
                남성
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={signUpForm.gender === "female"}
                  onChange={handleChange}
                  onBlur={handleError}
                  className="mr-2"
                />
                여성
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF7976] hover:bg-[#FF7976] text-white p-2 rounded transition-colors"
          >
            회원가입
          </button>
        </form>
      </div>

      <SignUpDialog
        open={showSignUpDialog}
        onOpenChange={(open) => dispatch(setSignUpDialog(open))}
      />
    </div>
  );
};

export default SignUp;
