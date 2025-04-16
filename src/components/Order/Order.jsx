import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  ReceiptLong as ReceiptLongIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import SignInErrorPage from "../404ErrorPage/SignInErrorPage";

import NoOrder from "./NoOrder";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Order() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <SignInErrorPage />;
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/orders/fetch_orders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            credentials: "include",
          }
        );

        if (response.status === 200) {
          setOrderDetails(response.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId, authToken]);

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 via-white to-white py-10 px-4 md:px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="space-y-8 p-8">
            <h2 className="text-3xl font-bold text-indigo-800 mb-8">Your Orders</h2>

            {orderDetails.length === 0 ? (
              <NoOrder />
            ) : (
              orderDetails.map((order) => (
                <motion.div
                  key={order._id}
                  className="flex gap-6 items-center justify-between border-b pb-6 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}>
                  <Link
                    to={`/order-details/${order._id}`}
                    className="flex items-center gap-4 hover:scale-105 transition-all duration-300 hover:bg-indigo-50 p-4 rounded-lg">
                    <img
                      src={order.orderItems[0].product.thumbnail.image_url}
                      alt="Product"
                      className="w-32 h-32 object-cover rounded-xl shadow-lg transition-transform duration-200 transform hover:scale-110"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {order.orderItems[0].product.title}
                      </h3>
                      <div className="text-gray-600">
                        <p className="text-sm flex items-center gap-2">
                          <LocalShippingIcon fontSize="small" className="text-blue-500" />{" "}
                          <span>
                            Delivery Date:{" "}
                            {new Date(order.deliveryDate).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>

                  <div className="ml-auto flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CurrencyRupeeIcon fontSize="small" className="text-green-600" />
                      <span className="text-lg font-semibold">
                        ₹{order.orderItems[0].product.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ReceiptLongIcon fontSize="small" className="text-yellow-600" />
                      <span className="text-sm font-medium">{order.status}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.history.back()}
          className="flex items-center gap-2 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-base font-medium shadow-md transition-all duration-200">
          <ArrowBackIcon fontSize="small" />
          Go Back
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Order;
