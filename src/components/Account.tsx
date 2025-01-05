"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaWallet, FaFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Account = () => {
  const [openMenu, setMenuOpen] = useState(false);
  const router = useRouter();

  const menuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/signin",
      });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const walletHandler = () => {
    router.push("/wallet");
    toast.success("Opened wallet");
  };

  const yourApplicationHandler = () => {
    router.push("/student");
    toast.success("Viewing your application!");
  };

  return (
    <div className="relative">
      {/* Profile Picture */}
      <div
        className="w-12 h-12 rounded-full bg-gray-300 cursor-pointer overflow-hidden border-2 border-gray-400"
        onClick={menuToggle}
      >
        <img
          // src="/profile-picture.jpg" // Replace with your dynamic profile picture URL
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dropdown Menu */}
      {openMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
          {/* Wallet Option */}
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={walletHandler}
          >
            <FaWallet className="mr-2" />
            Wallet
          </button>
          {/* Your Application Option */}
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={yourApplicationHandler}
          >
            <FaFileAlt className="mr-2" />
            Your Application
          </button>
          <hr className="my-1 border-gray-200" />
          {/* Logout Option */}
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
