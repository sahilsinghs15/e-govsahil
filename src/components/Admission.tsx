"use client";

import React, { useState } from "react";
import { Modal } from "./ui/modal";

const AdmissionsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-2xl rounded-3xl bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Admissions</h1>
        <p className="text-lg max-w-3xl mb-10">
          Start your academic journey with us. Explore our wide range of courses
          and unlock your potential. Begin by filling out our admission form
          today!
        </p>
        <button
          onClick={toggleModal}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg text-lg"
        >
          Fill Admission Form
        </button>
      </section>

      {/* Open Modal */}
      <div className="">
        <Modal isOpen={isModalOpen} onClose={toggleModal} />
      </div>
      <section className="py-16 px-6 bg-white text-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10">
          Admissions for Academic Year
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* FY */}
          <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-purple-100 to-purple-200 text-purple-900">
            <h3 className="text-xl font-semibold mb-2">First Year (FY)</h3>
            <p className="text-sm">
              Kickstart your academic journey with foundational courses and a
              vibrant learning environment.
            </p>
          </div>
          {/* SY */}
          <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-900">
            <h3 className="text-xl font-semibold mb-2">Second Year (SY)</h3>
            <p className="text-sm">
              Build on your knowledge with intermediate-level courses and
              practical exposure.
            </p>
          </div>
          {/* TY */}
          <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900">
            <h3 className="text-xl font-semibold mb-2">Third Year (TY)</h3>
            <p className="text-sm">
              Prepare for advanced challenges and specialized subjects to
              complete your undergraduate degree.
            </p>
          </div>
          {/* PG1 */}
          <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-green-100 to-green-200 text-green-900">
            <h3 className="text-xl font-semibold mb-2">
              Postgraduate Year 1 (PG1)
            </h3>
            <p className="text-sm">
              Dive deep into advanced topics and research-oriented courses in
              your chosen field.
            </p>
          </div>
          {/* PG2 */}
          <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-900">
            <h3 className="text-xl font-semibold mb-2">
              Postgraduate Year 2 (PG2)
            </h3>
            <p className="text-sm">
              Complete your postgraduate journey with capstone projects and
              expert guidance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionsPage;
