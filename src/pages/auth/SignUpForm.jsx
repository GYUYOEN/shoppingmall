import SignUpDialog from "@/components/auth/SignUpDialog";
import { useState } from "react";

import { InputForm } from "@/components/common/InputForm";
import { useError } from "@/hooks/useError";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    gender: "",
  });

  const [showDialog, setShowDialog] = useState(false);
  const { errors, handleError } = useError(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");

      setFormData({
        ...formData,
        [name]: onlyNumbers,
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

        <form onSubmit={handleSubmit}>
          <InputForm
            label="아이디"
            name="id"
            value={formData.id}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.id}
            className="mb-4"
          />

          <InputForm
            label="이메일"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.email}
            className="mb-4"
          />

          <InputForm
            label="이름"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.name}
            className="mb-4"
          />

          <InputForm
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.password}
            className="mb-4"
          />

          <InputForm
            label="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            onBlur={handleError}
            error={errors.passwordConfirm}
            className="mb-4"
          />

          <InputForm
            label="전화번호"
            name="phone"
            type="tel"
            value={formData.phone}
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
                  checked={formData.gender === "male"}
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
                  checked={formData.gender === "female"}
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

      <SignUpDialog open={showDialog} onOpenChange={setShowDialog} />
    </div>
  );
};

export default SignUpForm;
