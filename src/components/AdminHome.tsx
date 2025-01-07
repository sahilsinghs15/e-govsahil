"use client";

import React, { useState, useEffect } from "react";
import { StudentCard } from "./StudentCard"; // Ensure StudentCard component supports action buttons
import { StudentModal } from "./StudentModal";
import toast from "react-hot-toast";

interface Student {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone: number;
  dob: string;
  gender: string;
  course: string;
  rollNo?: string;
  admitted?: boolean;
  accepted?: boolean;
}

const AdminHome: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch students on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/studentForms");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        console.log("Data received:", data);
        setStudents(data.students); // Set students from the API response
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleAction = async (studentId: string, action: "accept" | "reject") => {
    try {
      const response = await fetch("http://localhost:3000/api/students/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update student action");
      }
      toast.success(`Student form ${action}ed successfully`);

      // Optionally update UI based on action
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId
            ? { ...student, accepted: action === "accept" }
            : student
        )
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCardClick = (student: Student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  if (loading) {
    return <div className="text-center p-6">Loading students...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {students.map((student) => (
          <div key={student._id} className="border p-4 rounded bg-white shadow">
            <StudentCard student={student} onClick={handleCardClick} />
            <div className="flex justify-between mt-4">
              {student.accepted ? (
                <span className="text-green-600 font-semibold">Verified</span>
              ) : (
                <>
                  <button
                    onClick={() => handleAction(student._id, "accept")}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(student._id, "reject")}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedStudent && (
        <StudentModal student={selectedStudent} onClose={closeModal} />
      )}
    </div>
  );
};

export default AdminHome;
