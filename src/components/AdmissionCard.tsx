"use client";

import React, { useEffect, useState } from "react";

const ApplicationCard = ({ application }: { application: any }) => {
  return (
    <div className="text-white font-bold shadow-md rounded-lg p-6 flex gap-6 items-center h-56">
      <img
        src={application.imageUrl || "/default-student.jpg"}
        alt="Student"
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
      />
      <div>
        <h2 className="text-xl text-black font-medium mb-2">
          {application.name || "N/A"}
        </h2>
        <p className="text-gray-300 mb-1">Email: {application.email || "N/A"}</p>
        <p className="text-gray-300 mb-1">Phone: {application.phone || "N/A"}</p>
        <p className="text-gray-300 mb-1">DOB: {application.dob || "N/A"}</p>
        <p className="text-gray-300 mb-1">Gender: {application.gender || "N/A"}</p>
        <p className="text-gray-300">Course: {application.course || "N/A"}</p>
      </div>
    </div>
  );
};

const YourApplicationPage = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/students/getStudent");
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch data");
          return;
        }
        const data = await response.json();
        // Assuming you're displaying the first student as a demo
        setApplication(data || {});
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="h-96 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <ApplicationCard application={application} />
      </div>
    </div>
  );
};

export default YourApplicationPage;
