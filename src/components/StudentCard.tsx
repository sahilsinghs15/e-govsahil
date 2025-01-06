import React from "react";

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
}

interface StudentCardProps {
  student: Student;
  onClick: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onClick,
}) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
      onClick={() => onClick(student)}
    >
      <h2 className="text-xl font-semibold text-black mb-2">{student.name}</h2>
      <p className="text-gray-600">Email: {student.email}</p>
      <p className="text-gray-600">Phone: {student.phone}</p>
      <p className="text-gray-600">DOB: {new Date(student.dob).toLocaleDateString()}</p>
      <p className="text-gray-600">Gender: {student.gender}</p>
      <p className="text-gray-600">Course: {student.course}</p>
    </div>
  );
};
