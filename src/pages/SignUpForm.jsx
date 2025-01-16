import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false);

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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateField = (name, value) => {
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
        const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
        if (!value) {
          error = "전화번호를 입력해주세요.";
        } else if (!phoneRegex.test(value)) {
          error = "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)";
        }
        break;

      case "gender":
        if (!value) {
          error = "성별을 선택해주세요.";
        }
        break;

      default:
        break;
    }
    return error;
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">아이디</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7976]"
            />
            {errors.id && (
              <p className="text-red-500 text-sm mt-1">{errors.id}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7976]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7976]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7976]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              비밀번호 확인
            </label>
            <input
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7976]"
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passwordConfirm}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">전화번호</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={11}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7976]"
              placeholder="01012345678"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>회원가입 완료</DialogTitle>
            <DialogDescription>
              회원가입이 서옹적으로 완료되었습니다. 로그인 페이지로 돌아갑니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => navigate("/login")}
              className="bg-[#FF7976] hover:bg-[#E86E6B]"
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpForm;
