import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import AlertBox from "../404ErrorPage/AlertBox";

const apiUrl = import.meta.env.VITE_BACK_END_URL;
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const PlaceOrder = () => {
  const [alert, setAlert] = useState(null);
  const { pid } = useParams();
  const navigate = useNavigate();

  const [idol, setIdol] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [order_id, setOrder_id] = useState(null);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/products/${pid}`);
        const { id, title, thumbnail, price } = response.data;

        setIdol({
          id,
          title,
          thumbnail: thumbnail.image_url,
          price,
        });
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [pid]);

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

  const checkoutPayment = async (productId) => {
    setOrderLoading(true);

    try {
      const isRazorpayLoaded = await loadRazorpay();
      if (!isRazorpayLoaded) {
        alert("Failed to load Razorpay. Please try again.");
        setOrderLoading(false);
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/products/orders/place_order`,
        {
          orderItem: [{ productId, quantity }],
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );

      console.log(response);

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
            console.log(response);
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
              response.data.user.address.firstName + response.data.user.address.lastName,
            email: response.data.user.email,
            contact: response.data.user.phone,
          },
          theme: { color: "#F37254" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Failed to place order. Please try again.",
      });
    } finally {
      setOrderLoading(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Number(newQuantity));
  };

  const shipping = 5.0;
  const taxes = 5.52;
  const total = idol ? idol.price * quantity + shipping + taxes : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Loading idol details...</p>
      </div>
    );
  }

  if (error || !idol) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg">
          Failed to load idol details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

        {/* Product Details */}
        <div className="flex items-center space-x-6 border-b pb-4 mb-4">
          <img
            src={idol.thumbnail}
            alt={idol.title}
            className="w-24 h-24 object-cover rounded-lg shadow"
          />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-700">{idol.title}</h3>
            <p className="text-sm text-gray-500">Price: ₹{idol.price}</p>
            <div className="flex items-center mt-2 space-x-2">
              <span className="text-sm text-gray-600">Quantity:</span>
              <select
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="border rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{(idol.price * quantity).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">₹{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes</span>
            <span className="font-medium">₹{taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-4">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={() => checkoutPayment(idol.id)}
          disabled={orderLoading}
          className={`w-full py-2 rounded-lg mt-6 text-lg font-medium transition ${
            orderLoading
              ? "bg-blue-400 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}>
          {orderLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              Placing Order...
            </div>
          ) : (
            "Pay Now"
          )}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg mt-4 text-lg font-medium hover:bg-gray-200 transition">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
