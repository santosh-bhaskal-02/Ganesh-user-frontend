import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import CartItems from "./cartItems";
import AlertBox from "../404ErrorPage/AlertBox";
const apiUrl = import.meta.env.VITE_BACK_END_URL;

const PlaceOrderCart = () => {
  const [alert, setAlert] = useState(null);
  const { pid } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  const [idol, setIdol] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/cart/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            credentials: "include",
          }
        );
        // console.log(response.data);
        if (response.status === 200) {
          setCart(response.data);
          console.log(response.data);
        }

        //console.log("cart",cart.cartItems);
      } catch (err) {
        console.error(err.response.data);
      }
    }
    fetchCart();
  }, []);

  if (!cart) {
    return;
  }

  if (cart.cartItems.length === 0) {
    return <h1>Cart Is Empty</h1>;
  }

  //const [shippingCharge, setShippingCharge] = useState(5.00);
  //const [taxCharge, setTaxCharge] = useState(8.32);

  const shippingCharge = 10.0;
  const taxCharge = 5.0;

  const calculateTotal = (subtotal) => {
    return subtotal + shippingCharge + taxCharge;
  };

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

  const handleCheckout = async () => {
    try {
      const isRazorpayLoaded = await loadRazorpay();
      if (!isRazorpayLoaded) {
        alert("Failed to load Razorpay. Please try again.");
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
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
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
            name: "Customer",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: { color: "#F37254" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };
  ` `;
  return (
    <div className="bg-gray-50 min-h-screen p-8">
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
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold border-b pb-4 mb-6">Order Summary</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-lg ">
            {cart.cartItems.map((item) => (
              <CartItems
                key={item._id}
                id={item._id}
                title={item.product.title}
                thumbnail={item.product.thumbnail.image_url}
                price={item.product.price}
                quantity={item.quantity}
              />
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="flex justify-between py-2 text-gray-700">
              <p>Subtotal</p>
              <p>₹{cart.totalPrice}</p>
            </div>
            <div className="flex justify-between py-2 text-gray-700">
              <p>
                Shipping estimate
                <span className="ml-1 text-gray-400 cursor-pointer" title="Flat rate">
                  ?
                </span>
              </p>
              <p>₹{shippingCharge.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-2 text-gray-700">
              <p>
                Tax estimate
                <span className="ml-1 text-gray-400 cursor-pointer" title="8.4%">
                  ?
                </span>
              </p>
              <p>₹{taxCharge.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-2 font-bold text-gray-900">
              <p>Order Total</p>
              <p>₹ {calculateTotal(cart.totalPrice)}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-2 rounded-md mt-4 hover:bg-indigo-700">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderCart;
