import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

import AddressForm from "@/components/shipping/AddressForm";

const Shipping = () => {
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

  const handleSubmit = (addressData) => {
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
          <AddressForm
            onSubmit={handleSubmit}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Shipping;
