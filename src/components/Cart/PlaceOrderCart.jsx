import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import AlertBox from "../404ErrorPage/AlertBox";
import SkeletonPlaceOrder from "../Order/SkeletonPlaceOrder";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import SignInErrorPage from "../404ErrorPage/SignInErrorPage";
import {
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  ReceiptLong as ReceiptLongIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Paid as PaidIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const apiUrl = import.meta.env.VITE_BACK_END_URL;
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const PlaceOrderCart = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <SignInErrorPage />;
  }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        });
        setCart(response.data);
      } catch (err) {
        setError(true);
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const checkoutPayment = async () => {
    setOrderLoading(true);

    try {
      const isRazorpayLoaded = await loadRazorpay();
      if (!isRazorpayLoaded) {
        alert("Failed to load Razorpay. Please try again.");
        setOrderLoading(false);
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/products/orders/place_order_cart`,
        {
          orderItem: cart.cartItems,
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const orderId = response.data.order.id;
        const options = {
          key: razorpayKey,
          amount: response.data.razorpayOrder.amount,
          currency: "INR",
          name: "Idol Booking",
          description: "Complete your purchase",
          order_id: response.data.razorpayOrder.id,

          handler: async function (response) {
            await axios.post(`${apiUrl}/api/products/orders/verify_payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId,
            });

            setAlert({
              type: "success",
              title: "Successful!",
              message: "Payment Successful! Order placed.",
            });

            navigate("/orders");
          },

          prefill: {
            name:
              response.data.user.address.firstName +
              " " +
              response.data.user.address.lastName,
            email: response.data.user.email,
            contact: response.data.user.phone,
          },
          theme: { color: "#FBBF24" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Failed to place order. Please try again.",
      });
      setOrderLoading(false);
    }
  };

  const shipping = 5.0;
  const taxes = 5.52;
  const total = cart ? cart.totalPrice + shipping + taxes : 0;

  if (orderLoading) {
    return <LoadingSpinner />;
  }

  if (error || !cart) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <SkeletonPlaceOrder />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-white py-10 px-4 md:px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}

      {/* Step Progress Bar */}
      <div className="flex justify-center gap-4 mb-8">
        {["Cart", "Shipping", "Payment"].map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                index < 2 ? "bg-yellow-400 text-black" : "bg-gray-300 text-white"
              }`}>
              {index + 1}
            </div>
            {step}
            {index < 2 && <div className="w-6 h-0.5 bg-gray-300 mx-2" />}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Cart Items */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Review Your Cart</h2>
            <div className="space-y-4">
              {cart.cartItems.map((item) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <img
                    src={item.product.thumbnail.image_url}
                    alt={item.product.title}
                    className="w-32 h-32 object-cover rounded-xl shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-600">Price: ₹{item.product.price}</p>
                    <div className="mt-3">
                      <span className="text-sm font-medium text-gray-600">
                        Quantity: {item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <ShoppingBagIcon fontSize="small" /> Subtotal
                </span>
                <span>₹{cart.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <LocalShippingIcon fontSize="small" /> Shipping
                </span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <ReceiptLongIcon fontSize="small" /> Taxes
                </span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-semibold text-gray-800">
                <span className="flex items-center gap-2">
                  <CurrencyRupeeIcon fontSize="small" /> Total
                </span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={checkoutPayment}
                disabled={orderLoading}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-lg font-medium transition duration-300 ${
                  orderLoading
                    ? "bg-yellow-300 text-yellow-800 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg"
                }`}>
                <PaidIcon fontSize="small" />
                {orderLoading ? "Placing Order..." : "Pay Now"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(-1)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-base font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
                <ArrowBackIcon fontSize="small" />
                Go Back
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceOrderCart;
