import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneIcon from "@mui/icons-material/Phone";
import { AuthContext } from "../ContextApi/AuthContext";
import AccountDropdown from "./AccountDropdown";
import DiamondIcon from "@mui/icons-material/Diamond";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useContext(AuthContext);

  const isLoginPage = location.pathname === "/login";
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dropdownRefDesktop = useRef(null);
  const dropdownRefMobile = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefDesktop.current &&
        !dropdownRefDesktop.current.contains(event.target) &&
        dropdownRefMobile.current &&
        !dropdownRefMobile.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavLink = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 text-white hover:text-blue-400 transition duration-200 ease-in-out">
      <Icon fontSize="small" />
      {label}
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white sticky top-0 z-50 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-700 transition">
              {isMobileMenuOpen ? (
                <CloseIcon className="text-white" />
              ) : (
                <MenuIcon className="text-white" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/explore")}>
            <img className="h-22 w-32" src="new2.png" alt="Logo" />
          </div>

          {/* Right Icons - Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <ShoppingCartIcon
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => navigate("/cart")}
            />
            {!signIn ? (
              <Link
                to="/login"
                className="bg-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
                <LoginIcon fontSize="small" className="mr-1" />
                Login
              </Link>
            ) : (
              <div ref={dropdownRefMobile} className="relative">
                <AccountCircleOutlinedIcon
                  className="cursor-pointer hover:text-blue-400 transition"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md z-50 w-40">
                    <AccountDropdown />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon={HomeIcon} label="Home" />
            <NavLink to="/about_us" icon={InfoIcon} label="About Us" />
            <NavLink to="/contact_us" icon={PhoneIcon} label="Contact Us" />

            <a
              href="/custom_form"
              className="flex items-center gap-2 px-4 py-2 text-white hover:text-blue-400 transition duration-200 ease-in-out">
              <DiamondIcon className="w-5 h-5" />
              Customized Idol
            </a>

            <ShoppingCartIcon
              className="cursor-pointer hover:text-blue-400 transition"
              onClick={() => navigate("/cart")}
            />
            {!signIn ? (
              <Link
                to={isLoginPage ? "/signup" : "/login"}
                className="bg-blue-600 px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-700 transition">
                {isLoginPage ? (
                  <>
                    <HowToRegIcon fontSize="small" />
                    Sign Up
                  </>
                ) : (
                  <>
                    <LoginIcon fontSize="small" />
                    Login
                  </>
                )}
              </Link>
            ) : (
              <div ref={dropdownRefDesktop} className="relative">
                <AccountCircleOutlinedIcon
                  className="cursor-pointer hover:text-blue-400 transition"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md z-50 w-40">
                    <AccountDropdown />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4 space-y-3 animate-slideDown">
          <NavLink to="/" icon={HomeIcon} label="Home" />
          <NavLink to="/about_us" icon={InfoIcon} label="About Us" />
          <NavLink to="/contact_us" icon={PhoneIcon} label="Contact Us" />
          {!signIn && (
            <Link
              to="/login"
              className="block bg-blue-600 text-center py-2 rounded hover:bg-blue-700 transition">
              <LoginIcon fontSize="small" className="mr-1 inline" />
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
