import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { IdolProvider } from "./components/ContextApi/IdolContext.jsx";
import { AuthProvider } from "./components/ContextApi/AuthContext.jsx";

//import Heading from "./components/Navbar/heading.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./components/Home/LandingPage.jsx";
import Content from "./components/Container/IdolCardsList.jsx";
import Login from "./components/Authentication/Login.jsx";
import Signup from "./components/Authentication/Signup.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Order from "./components/Order/Order.jsx";
import Idoldetails from "./components/Productfeature/Idoldetails.jsx";
import Footer from "./components/Footer/Footer.jsx";
//import Sidebar from "./components/Navbar/Sidebar.jsx";
import "./index.css";
//import UserProfile from "./components/User/UserProfile.jsx";
import AddAddress from "./components/Address/AddAddress.jsx";
import CheckAddress from "./components/Address/CheckAddress.jsx";
import PlaceOrder from "./components/Order/PlaceOrder.jsx";
import CustomForm from "./components/CustomForm/CustomForm.jsx";
import AboutUs from "./components/NavbarPages/AboutUs.jsx";
import ContactUs from "./components/NavbarPages/ContactUs.jsx";
import User from "./components/User/User.jsx";
import SavedAddress from "./components/User/SavedAddress.jsx";
import PersonelInfo from "./components/User/PersonelInfo.jsx";
import PlaceOrderCart from "./components/Cart/PlaceOrderCart.jsx";
import ForgotPassword from "./components/Authentication/ForgotPassword.jsx";
import TermsConditions from "./components/Policy/TermsConditions.jsx";
import RefundPolicy from "./components/Policy/RefundPolicy.jsx";
import ShippingPolicy from "./components/Policy/ShippingPolicy.jsx";
import PaymentsPolicy from "./components/Policy/PaymentPolicy.jsx";
import PrivacyPolicy from "./components/Policy/PrivacyPolicy.jsx";

function AppContent() {
  const location = useLocation();
  const isLogin = location.pathname == "/login";
  const isSignup = location.pathname == "/signup";
  const isHome = location.pathname == "/";
  const authPage = isLogin || isSignup || isHome;

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/explore" element={<Content />} />
          <Route path="/idoldetails/:pid" element={<Idoldetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />

          <Route path="/profile/*" element={<User />}>
            <Route path="" element={<PersonelInfo />} />
            <Route path="info" element={<PersonelInfo />} />
            <Route path="saved_addresses" element={<SavedAddress />} />
          </Route>

          <Route path="/address/:pid" element={<CheckAddress />} />
          <Route path="/address" element={<CheckAddress />} />
          <Route path="/add_address/:pid" element={<AddAddress />} />
          <Route path="/add_address" element={<AddAddress />} />
          <Route path="/profile/add_address" element={<AddAddress />} />
          <Route path="/place_order/:pid" element={<PlaceOrder />} />
          <Route path="/place_order_cart" element={<PlaceOrderCart />} />

          <Route path="/custom" element={<CustomForm />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/contact_us" element={<ContactUs />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/cancellation-refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/payments-policy" element={<PaymentsPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <IdolProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </IdolProvider>
    </BrowserRouter>
  );
}

export default App;
