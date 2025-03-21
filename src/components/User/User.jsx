import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, Outlet } from "react-router-dom";
import ErrorPage from "../404ErrorPage/ErrorPage";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function User() {
  const [profile, setProfile] = useState(null);
  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    if (!userId || !authToken) {
      console.error("User is not authenticated. Missing token or userId.");
      return <ErrorPage />;
    }

    const fetchProfile = async () => {
      console.log(userId);
      try {
        const response = await axios.get(`${apiUrl}/api/users/login/userlist/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data);
          setProfile(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-gray-800">Hello,</h1>
          <h2 className="text-2xl font-semibold text-blue-600">
            {profile.user.firstName + " " + profile.user.lastName}
          </h2>
        </div>
        <nav>
          <ul className="space-y-6">
            <li>
              <Link
                to="/orders"
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
                <span>My Orders</span>
              </Link>
            </li>
            <li>
              <div className="font-medium text-gray-700">Account Settings</div>
              <ul className="pl-4 space-y-2 text-sm text-gray-500">
                <li>
                  <Link to="info" className="hover:text-blue-600">
                    Profile Information
                  </Link>
                </li>
                <li>
                  <Link to="saved_addresses" className="hover:text-blue-600">
                    Manage Addresses
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-10">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <Outlet context={{ profile }} />
        </div>
      </div>
    </div>
  );
}

export default User;
