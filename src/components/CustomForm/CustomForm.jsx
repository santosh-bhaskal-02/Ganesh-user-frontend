import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import {
  FilePlus2,
  ImagePlus,
  Loader2,
  XCircle,
  SendHorizonal,
  Ruler,
  Info,
} from "lucide-react";
import AlertBox from "../404ErrorPage/AlertBox";
import SignInErrorPage from "../404ErrorPage/SignInErrorPage";
import { useEffect } from "react";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function CustomForm() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(null);

  const [suggestions, setSuggestions] = useState({
    suggestion: "",
    height: "",
    specification: "",
    image: null,
  });

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    return <SignInErrorPage />;
  }

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/custom-idol/fetch/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        console.log(response.data);
        setForm(response.data.result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuggestions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSuggestions((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const addSuggestion = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("suggestion", suggestions.suggestion);
    formData.append("size", suggestions.height);
    formData.append("otherSpecifications", suggestions.specification);
    if (suggestions.image) {
      formData.append("image", suggestions.image);
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/custom-idol/add/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log(response.data.message);
        setAlert({
          type: "success",
          title: "Successful!",
          message: response.data.message,
        });
        setSuggestions({
          suggestion: "",
          height: "",
          specification: "",
          photo: null,
        });
        document.getElementById("image").value = null;
      } else {
        setAlert({
          type: "error",
          title: "Oops!",
          message: "Failed to submit suggestion. Try again!",
        });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        title: "Oops!",
        message: error.response?.data?.message || "Something went wrong. Try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSuggestions({
      suggestion: "",
      height: "",
      specification: "",
      photo: null,
    });
    document.getElementById("photo").value = null;
  };

  return (
    <div className="bg-yellow-50 min-h-screen py-10 px-4 flex items-center justify-center">
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

      {loading && <LoadingSpinner />}
      {form && (
        <div className="mt-10 p-6 border-t border-gray-300">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Your Custom Idol Suggestion
          </h3>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Suggestion:</span> {form.suggestion}
            </p>
            <p>
              <span className="font-semibold">Height:</span> {form.size}
            </p>
            <p>
              <span className="font-semibold">Specifications:</span>{" "}
              {form.otherSpecifications}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  form.status === "Pending"
                    ? "bg-yellow-500"
                    : form.status === "Accepted"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}>
                {form.status}
              </span>
            </p>
            {form.image && (
              <img
                src={`${apiUrl}/${form.image}`}
                alt="Custom Idol"
                className="w-64 h-64 object-cover rounded mt-4"
              />
            )}
          </div>
        </div>
      )}

      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-yellow-600 flex items-center gap-2">
          <FilePlus2 className="w-7 h-7 text-yellow-500" />
          Add Suggestion
        </h2>

        <form className="space-y-6" onSubmit={addSuggestion}>
          {/* Suggestion */}
          <div>
            <label
              htmlFor="suggestion"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FilePlus2 className="w-4 h-4 text-yellow-500" />
              Suggestion
            </label>
            <textarea
              id="suggestion"
              name="suggestion"
              rows="4"
              required
              value={suggestions.suggestion}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Write your suggestion here..."></textarea>
          </div>

          {/* Height */}
          <div>
            <label
              htmlFor="height"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Ruler className="w-4 h-4 text-yellow-500" />
              Height (in cm or inches)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={suggestions.height}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g. 12 inches / 30 cm"
            />
          </div>

          {/* Other Specifications */}
          <div>
            <label
              htmlFor="specification"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Info className="w-4 h-4 text-yellow-500" />
              Other Specifications
            </label>
            <input
              type="text"
              id="specification"
              name="specification"
              value={suggestions.specification}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g. color, material, special notes"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label
              htmlFor="photo"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <ImagePlus className="w-4 h-4 text-yellow-500" />
              Photo (Optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="reset"
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all">
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all disabled:opacity-60">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <SendHorizonal className="w-4 h-4" />
                  Submit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomForm;
