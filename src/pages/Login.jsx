import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 rounded-lg ">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              아이디
            </label>
            <input
              type="id"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF7976] focus:border-[#FF7976]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF7976] focus:border-[#FF7976]"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-[#FF7976] focus:ring-[#FF7976] border-gray-300 rounded"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-900"
            >
              아이디 저장
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="text-[#FF7976] hover:text-[#FF7976]">
              비밀번호 찾기
            </a>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF7976] hover:bg-[#FF7976] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7976]"
          >
            로그인
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">아직 회원이 아니신가요?</span>
          <button
            onClick={() => navigate("/signup")}
            className="ml-2 text-sm text-[#FF7976] hover:text-[#FF7976]"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
