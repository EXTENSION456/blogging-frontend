import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiEdit,
  FiBookmark,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    navigate("/dashboard/create");
  };

  const handleLogout = async () => {
    try {
      // Clear user session/token
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm w-full top-0">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="text-3xl font-semibold">Blogipsum</div>
            </Link>
          </div>

          {/* Navigation - Desktop */}

          <div className="flex gap-4 items-center">
            <div className="">
              <Button
                className="cursor-pointer text-md font-normal"
                onClick={handleClick}
              >
                Create
              </Button>
            </div>

            {/* user profile section */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUser className="w-5 h-5" />
                </div>
                <span className="hidden md:block text-md font-medium ">
                  John Doe
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md py-1">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FiEdit className="mr-3 h-4 w-4" />
                    My Blogs
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer"
                  >
                    <FiLogOut className="mr-3 h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User Profile Dropdown */}
        </div>
      </div>
    </header>
  );
};

export default Header;
