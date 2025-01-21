import { useState } from "react";

import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/common/InputForm";
import { useError } from "@/hooks/useError";

export const AddressForm = ({ onSubmit, onCancel }) => {
  const [addressData, setAddressData] = useState({
    id: "",
    postcode: "",
    address: "",
    detailAddress: "",
    isDefault: false,
  });
  const { errors, handleError, setErrors, validateField } = useError();

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {
      address: validateField("address", addressData.address),
      detailAddress: validateField("detailAddress", addressData.detailAddress),
    };

    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
      return;
    }

    onSubmit(addressData)

    setAddressData({
      id: "",
      postcode: "",
      address: "",
      detailAddress: "",
      isDefault: false,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">새 배송지 추가</h3>
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            우편번호
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="postcode"
              value={addressData.postcode}
              readOnly
              className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF7976] focus:border-[#FF7976]"
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
        <InputForm
          label="주소"
          name="address"
          value={addressData.address}
          onChange={handleChange}
          onBlur={handleError}
          error={errors.address}
          placeholder="주소"
        />

        <InputForm
          label="상세주소"
          name="detailAddress"
          value={addressData.detailAddress}
          onChange={handleChange}
          onBlur={handleError}
          error={errors.detailAddress}
          placeholder="상세주소"
        />

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

        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1 bg-[#FF7976] hover:bg-[#E86E6B] text-white"
          >
            저장하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
