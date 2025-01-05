"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";
import Account from "./Account";

export const Appbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Function to handle menu item clicks
  const routerHandler = (path: string) => {
    router.push(path); // Redirect to the provided path
  };

  return (
    <div className="h-12 w-full flex items-center justify-between border-b border-gray-600 pl-10 pr-10 pb-2">
      {/* Title */}
      <div
        className="bg-gradient-to-b text-2xl pl-4 from-blue-400 to-blue-700 bg-clip-text pr-1 font-black flex justify-center items-center gap-2 tracking-tighter text-transparent hover:cursor-pointer"
        onClick={() => routerHandler("/")} // Redirect to home when title is clicked
      >
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="E-Governance"
        />
        <h2>E-Governance</h2>
      </div>

      {/* Menu bar */}
      <div className="text-white flex justify-evenly items-center gap-6">
        <div
          className="hover:cursor-pointer hover:underline hover:text-gray-300"
          onClick={() => routerHandler("/home")}
        >
          Home
        </div>
        <div
          className="hover:cursor-pointer hover:underline"
          onClick={() => routerHandler("/admission")} 
        >
          Admission
        </div>
        <div
          className="hover:cursor-pointer hover:underline"
          onClick={() => routerHandler("/academics")} 
        >
          Academics
        </div>
        <div
          className="hover:cursor-pointer hover:underline"
          onClick={() => routerHandler("/programs")} 
        >
          Programs
        </div>
        <div
          className="hover:cursor-pointer hover:underline"
          onClick={() => routerHandler("/department")} 
        >
          Department
        </div>
        <div
          className="hover:cursor-pointer hover:underline"
          onClick={() => routerHandler("/student")} 
        >
          Students
        </div>
        <div
          className="hover:cursor-pointer hover:underline"
          onClick={() => routerHandler("/contact-us")} 
        >
          Contact Us
        </div>
      </div>

      {/* Join Button */}
      <div className="flex justify-center items-center gap-5">
        <div className="m-3">
          <Account />
        </div>
      </div>

      {/* Modal */}
      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal} /> */}
    </div>
  );
};
