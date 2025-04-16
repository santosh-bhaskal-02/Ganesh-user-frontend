import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, Outlet } from "react-router-dom";
import ErrorPage from "../404ErrorPage/ErrorPage";
import SignInErrorPage from "../404ErrorPage/SignInErrorPage";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";

import { Menu } from "lucide-react";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function User() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState();
  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");
  const [sidebarOpen, setSidebarOpen] = useState(false);

   if (!userId || !authToken) {
      console.error("User is not authenticated. Missing token or userId.");
      return <SignInErrorPage />;
    }
  

  useEffect(() => {

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
      } finally {
        setLoading(false);
        // if (!profile) {
        //   return <ErrorPage />;
        // }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between bg-blue-500 px-4 py-3 shadow">
            <h2 className="text-lg font-semibold text-white">Dashboard</h2>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? "block" : "hidden"
            } md:block w-full md:w-1/4 bg-white shadow-lg p-6 transition-all`}>
            <div className="mb-8">
              <h1 className="text-xl font-bold text-gray-700">Welcome,</h1>
              <h2 className="text-2xl font-semibold text-blue-600">
                {profile.firstName + " " + profile.lastName}
              </h2>
            </div>

            <nav>
              <ul className="space-y-6">
                <li>
                  <Link
                    to="/orders"
                    className="block text-gray-700 hover:text-blue-600 font-medium transition duration-200">
                    My Orders
                  </Link>
                </li>

                <li>
                  <div className="font-semibold text-gray-700">Account Settings</div>
                  <ul className="pl-4 mt-2 space-y-2 text-sm text-gray-600">
                    <li>
                      <Link
                        to="info"
                        className="hover:text-blue-600 block transition duration-200">
                        Profile Information
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="saved_addresses"
                        className="hover:text-blue-600 block transition duration-200">
                        Manage Addresses
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-grow p-4 sm:p-8">
            <Outlet context={{ profile }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
