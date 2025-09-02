"use client";

import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
const AdminAppbar = () => {
  // const router = useRouter();

  // const routerHandler = (path: string) => {
  //   router.push(path);
  // };

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/signin",
      });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="h-12 w-full flex items-center justify-between border-b border-gray-600 pl-10 pr-10 pb-2">
      <div>
          <button
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
      </div>
      
    </div>
  );
};

export default AdminAppbar;