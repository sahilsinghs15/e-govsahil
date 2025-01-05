"use client";

import React from "react";

const ApplicationCard = ({ application }: { application: any }) => {
  return (
    <div className="bg-gray-800 text-white shadow-md rounded-lg p-6 flex gap-6 items-center">
      {/* Profile Picture */}
      <img
        src={application.imageUrl}
        alt="Student"
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
      />
      {/* Application Details */}
      <div>
        <h2 className="text-2xl font-bold mb-2">{application.name}</h2>
        <p className="text-gray-300 mb-1">Email: {application.email}</p>
        <p className="text-gray-300 mb-1">Phone: {application.phone}</p>
        <p className="text-gray-300 mb-1">DOB: {application.dob}</p>
        <p className="text-gray-300 mb-1">Gender: {application.gender}</p>
        <p className="text-gray-300">Course: {application.course}</p>
      </div>
    </div>
  );
};

const YourApplicationPage = () => {
  const mockApplicationData = {
    imageUrl: "/student-photo.jpg", // Replace with the actual photo URL
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    dob: "2000-01-01",
    gender: "Male",
    course: "First Year (FY)",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Your Application Details
      </h1>
      <div className="max-w-4xl mx-auto">
        <ApplicationCard application={mockApplicationData} />
      </div>
    </div>
  );
};

export default YourApplicationPage;
