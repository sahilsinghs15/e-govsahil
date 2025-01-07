"use client";
import React, { useState } from "react";
import { Button } from "./button";
import { X } from "lucide-react"; // Icon library
import toast from "react-hot-toast"; // Notification library
import { Input } from "./input";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    course: "",
    marksheet: null as File | null,
  });

  const isFormIncomplete =
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.dob ||
    !formData.gender ||
    !formData.course ||
    !formData.marksheet;

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    course: "",
    marksheet: "",
  });
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({
          ...errors,
          marksheet: "Only JPEG, PNG, and JPG files are allowed.",
        });
        setFormData({ ...formData, marksheet: null });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors({
          ...errors,
          marksheet: "File size should not exceed 10 MB.",
        });
        setFormData({ ...formData, marksheet: null });
        return;
      }
    }

    setFormData({ ...formData, marksheet: file });
    setErrors({ ...errors, marksheet: "" });
  };
  
  const validateForm = () => {
    const valid = true;
    const newErrors: typeof errors = {
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      course: "",
      marksheet: "",
    };

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.course) newErrors.course = "Course selection is required.";
    // if (!formData.marksheet) newErrors.marksheet = "Marksheet is required.";

    setErrors(newErrors);
    return valid;
  };

  
  const handleSubmission = async (event:any) => {
    event.preventDefault();
    const { name, email, phone, dob, gender, course } = formData;

    try {
      const response = await fetch("/api/students/admissionForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          dob: dob,
          gender: gender.toUpperCase(),
          course : course.toUpperCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to submit the form.");
        return;
      }

      toast.success(data.message || "Form submitted successfully!");
      router.push("/student");
      onClose();
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-black focus:outline-none"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-black">
          Student Registration
        </h2>
        <form onSubmit={handleSubmission}>
          
          {/* Student Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : ""
              }`}
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          {/* Phone Number */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-black"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
          {/* Date of Birth */}
          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-black"
            >
              Date of Birth
            </label>
            <Input
              id="dob"
              type="date"
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.dob ? "border-red-500" : ""
              }`}
              value={formData.dob}
              onChange={handleInputChange}
            />
            {errors.dob && (
              <p className="text-sm text-red-500 mt-1">{errors.dob}</p>
            )}
          </div>
          {/* Gender */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-black"
            >
              Gender
            </label>
            <select
              id="gender"
              className={`w-full mt-1 p-2 border border-gray-700/50 rounded-md focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500 ${
                errors.gender ? "border-red-500" : ""
              }`}
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="course"
              className="block text-sm font-medium text-black"
            >
              Course
            </label>
            <select
              id="course"
              className={`w-full mt-1 p-2 border border-gray-700/50 rounded-md focus:outline-none text-gray-800 focus:ring-2 focus:ring-blue-500 ${
                errors.course ? "border-red-500" : ""
              }`}
              value={formData.course}
              onChange={handleInputChange}
            >
              <option value="">Select your course</option>
              <option value="IT">Information Technology</option>
              <option value="CS">Computer Science</option>
              <option value="DS">Data Science</option>
            </select>
            {errors.course && (
              <p className="text-sm text-red-500 mt-1">{errors.course}</p>
            )}
          </div>
          {/* Upload Marksheet */}
          <div className="mb-4">
            <label
              htmlFor="marksheet"
              className="block text-sm font-medium text-black"
            >
              12th Grade Marksheet
            </label>
            <input
              id="marksheet"
              type="file"
              className="mt-1 block w-full text-sm text-black
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:bg-blue-500 file:text-white
                hover:file:bg-blue-600 
                border border-gray-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFileChange}
            />
            {errors.marksheet && (
              <p className="text-sm text-red-500 mt-1">{errors.marksheet}</p>
            )}
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={isFormIncomplete}
              className="bg-green-400" 
             
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};