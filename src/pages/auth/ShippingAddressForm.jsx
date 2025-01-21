import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

import { InputForm } from "@/components/common/InputForm";
import { useError } from "@/hooks/useError";

const ShippingAddressForm = () => {
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      postcode: "06134",
      address: "서울특별시 강남구 역삼동",
      detailAddress: "123-45",
      isDefault: true,
    },
    {
      id: "2",
      postcode: "04322",
      address: "서울특별시 용산구 한남동",
      detailAddress: "67-89",
      isDefault: false,
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addressData, setAddressData] = useState({
    id: "",
    postcode: "",
    address: "",
    detailAddress: "",
    isDefault: false,
  });
  const { errors, handleError, setErrors, validateField } = useError();

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
  };

  const handleDelete = (addressId) => {
    const filteredAddresses = addresses.filter((addr) => addr.id !== addressId);
    setAddresses(filteredAddresses);
  };

  const handleSetDefault = (addressId) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
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

    const newAddress = {
      ...addressData,
      id: Date.now().toString(),
    };

    if (addresses.length === 0) {
      newAddress.isDefault = true;
    } else if (newAddress.isDefault) {
      setAddresses(
        addresses.map((addr) => ({
          ...addr,
          isDefault: false,
        }))
      );
    }

    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);

    setAddressData({
      id: "",
      postcode: "",
      address: "",
      detailAddress: "",
      isDefault: false,
    });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">배송지 관리</h2>
          {!showAddForm && (
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-[#FF7976] hover:bg-[#E86E6B] text-white"
            >
              새 배송지 추가
            </Button>
          )}
        </div>
        <div className="space-y-4 mb-6">
          {addresses.map((addr) => (
            <Card key={addr.id} className="p-4">
              <CardContent className="p-0">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{addr.postcode}</span>
                      {addr.isDefault && (
                        <span className="text-xs px-2 py-1 bg-[#FF7976] text-white rounded">
                          기본 배송지
                        </span>
                      )}
                    </div>
                    <p>{addr.address}</p>
                    <p className="text-gray-600">{addr.detailAddress}</p>
                  </div>
                  <div className="flex gap-2">
                    {!addr.isDefault && (
                      <Button
                        onClick={() => handleSetDefault(addr.id)}
                        variant="outline"
                        className="text-sm"
                      >
                        기본 배송지로 설정
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(addr.id)}
                      variant="outline"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">새 배송지 추가</h3>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                취소
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  우편번호
                </label>
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
        )}
      </div>
    </div>
  );
};

export default ShippingAddressForm;
