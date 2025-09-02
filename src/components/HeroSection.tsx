"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center"
        >
          <h1 className="text-4xl font-bold">
            Welcome to E-Governance Platform
          </h1>
          <p className="mt-4 text-lg">
            Streamlining admissions and course management for a seamless
            experience.
          </p>
          <motion.button
            onClick={() => router.push("/admission")}
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg"
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* Admissions Section */}
      <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Admissions
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {["FY", "SY", "TY", "PG 1", "PG 2"].map((year, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md text-center"
              >
                {year}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Academics Section */}
      <section className="py-10 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">Academics</h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { name: "UG Program", icon: "🎓" },
              { name: "PG Program", icon: "🎓" },
              { name: "SFC Program", icon: "💰" },
              { name: "Certificate Courses", icon: "📜" },
              { name: "Fee Structure", icon: "💳" },
              { name: "Time Table", icon: "📅" },
              { name: "Prospectus", icon: "📖" },
              { name: "Examination", icon: "📝" },
            ].map((academic, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl">{academic.icon}</div>
                <p className="mt-2 font-medium">{academic.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Facilities & Resources
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[
              "Laboratories",
              "Physical Education",
              "Seminar Hall",
              "Classrooms",
              "Library",
              "Green Campus",
              "N.C.C.",
              "N.S.S.",
            ].map((facility, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md text-center"
              >
                <p className="font-medium">{facility}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="py-10 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Proud Facts
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-6 gap-4"
          >
            {[
              "Total Departments",
              "Associations",
              "Research & Publications",
              "Workshops/Seminars Organized",
              "Awards & Recognitions",
              "Grants Received",
            ].map((fact, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-yellow-400 p-4 rounded-lg text-center"
              >
                <p className="font-medium">{fact}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default HeroSection;
