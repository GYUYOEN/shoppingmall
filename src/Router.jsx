import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUpForm from "./pages/auth/SignUpForm";
import ShippingAddressForm from "./pages/auth/ShippingAddressForm";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/shipping" element={<ShippingAddressForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
