import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { IdolContext } from "../ContextApi/IdolContext";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import { ShoppingCart, Heart, Minus, Plus, PackageOpen, Ruler, Info } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import AlertBox from "../404ErrorPage/AlertBox";
import ErrorPage from "../404ErrorPage/ErrorPage";
import SkeletanIdolDetails from "./SkeletanIdolDetails";
import SkeletonIdolList from "./SkeletanIdolList";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Idoldetails() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { pid } = useParams();
  const { idolList } = useContext(IdolContext);
  const [idol, setIdol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imageSrc, setImageSrc] = useState("");

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const fetchIdolDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/products/${pid}`);
        if (response.status === 200) {
          setIdol(response.data);
        }
        setImageSrc(response.data.thumbnail?.image_url || "fallback-image.jpg");
      } catch (err) {
        console.error("Error fetching idol details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchIdolDetails();
  }, [pid]);

  const addToCart = async (productId) => {
    if (!userId || !authToken) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Please Sign In",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/api/products/cart/add_to_cart`,
        { cartItem: { productId, quantity }, user: userId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setAlert({ type: "success", title: "Successful!", message: response.data.message });
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong. Try again!",
      });
      console.error("Error adding to cart:", err);
    }
  };

  const buyNow = (productId) => navigate(`/address/${productId}`);
  const featureIdol = (id) => navigate(`/idoldetails/${id}`);

  return (
    <div className="flex flex-col items-center space-y-6 px-6 py-8 bg-gray-50 min-h-screen">
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
          <AlertBox {...alert} onClick={() => setAlert(null)} />
        </div>
      )}

      {loading ? (
        <SkeletanIdolDetails />
      ) : (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl p-8 w-full max-w-6xl">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={imageSrc}
              alt={idol.title}
              className="w-full md:w-96 rounded-lg"
              loading="lazy"
              onError={() => setImageSrc("fallback-image.jpg")}
            />
          </div>

          <div className="w-full md:w-1/2 px-6 space-y-5">
            <h1 className="text-3xl font-bold text-gray-900">{idol.title}</h1>

            <p className="text-gray-600 text-sm flex items-center gap-2">
              <PackageOpen className="w-4 h-4" /> {idol.category?.name}
              <Ruler className="w-4 h-4" /> Size: {idol.size}
            </p>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-3xl font-semibold text-green-600">
                ₹ {idol.price}
              </span>
              <span className="text-sm bg-red-100 text-red-600 font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <Info className="w-4 h-4" />
                {idol.stock > 0 ? "Limited Stock" : "Out of Stock"}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed flex gap-2">
              <Info className="w-5 h-5 text-gray-500 mt-1" /> {idol.description}
            </p>

            {idol.stock > 0 && (
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition"
                    disabled={quantity <= 1}>
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="px-6 py-2 text-lg font-medium text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => Math.min(5, prev + 1))}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition"
                    disabled={quantity >= 5}>
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">(Max 5)</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-4">
              {idol.stock > 0 ? (
                <>
                  <button
                    onClick={() => buyNow(idol.id)}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg hover:shadow-md transition">
                    Buy Now
                  </button>
                  <button
                    onClick={() => addToCart(idol.id)}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                  </button>
                </>
              ) : (
                <span className="px-6 py-3 bg-red-100 text-red-600 font-semibold rounded-lg">
                  Out of Stock
                </span>
              )}
              <button className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">You may also like</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}>
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonIdolList />
                </SwiperSlide>
              ))
            : idolList?.map((idol) => (
                <SwiperSlide key={idol.id}>
                  <div
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
                    onClick={() => featureIdol(idol.id)}>
                    <img
                      src={idol.thumbnail?.image_url || "fallback-image.jpg"}
                      alt={idol.title}
                      className="w-full h-80 object-cover cursor-pointer transform hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {idol.title}
                      </h3>
                      <p className="text-gray-600 text-sm">₹{idol.price}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Idoldetails;
