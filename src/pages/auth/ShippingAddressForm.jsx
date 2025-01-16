import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ShippingAddressForm = () => {
  const [addressData, setAddressData] = useState({
    postcode: "",
    address: "",
    detailAddress: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setAddressData((prev) => ({
          ...prev,
          postcode: data.zonecode,
          address: data.address,
        }));
        setErrors((prev) => ({
          ...prev,
          postcode: "",
          address: "",
        }));
      },
    }).open();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!addressData.postcode || !addressData.address) {
      newErrors.postcode = "우편번호와 주소를 입력해주세요";
    }

    if (!addressData.detailAddress) {
      newErrors.detailAddress = "상세주소를 입력해주세요";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">배송지 설정</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">우편번호</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="postcode"
                value={addressData.postcode}
                readOnly
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7976]"
                placeholder="우편번호"
              />
              <Button
                type="button"
                onClick={handlePostcodeSearch}
                className="bg-[#FF7976] hover:bg-[#E86E6B] text-white"
              >
                우편번호 검색
              </Button>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">주소</label>
            <input
              type="text"
              name="address"
              value={addressData.address}
              readOnly
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7976]"
              placeholder="주소"
            />
            {errors.postcode && (
              <p className="text-red-500 text-sm">{errors.postcode}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">상세주소</label>
            <input
              type="text"
              name="detailAddress"
              value={addressData.detailAddress}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#FF7976]"
              placeholder="동/호수 입력"
            />
            {errors.detailAddress && (
              <p className="text-red-500 text-sm">{errors.detailAddress}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              id="isDefault"
              checked={addressData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 text-[#FF7976] rounded border-gray-300 focus:ring-[#FF7976]"
            />
            <label htmlFor="isDefault" className="ml-2 text-sm font-medium">
              기본 배송지로 설정
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF7976] hover:bg-[#E86E6B] text-white"
          >
            저장하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
