"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";


export default function ContactUS() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section className="bg-[#100c14] py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Contact Us
        </h1>

        <div className="flex flex-wrap -mx-4">
          {/* Contact Details */}
          <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
              <h2 className="text-2xl font-semibold mb-4">Reach Us</h2>
              <p className="mb-4">
                <strong>E-Governance</strong>
                <br /> Andheri East, Mumbai, Maharashtra 400093
              </p>
              <p className="mb-4">
                <strong>Contact Us:</strong>
                <br /> Mobile No: 1234567890
              </p>
              <p>
                <strong>Write To Us:</strong>
                <br /> info@e-governance.ac.in
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3 px-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Drop us a message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="email">
                    Your Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="subject">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="focus:ring-none border-none bg-primary/5 focus:outline-none"
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-700/50 bg-white px-2 text-black"
                    rows={4}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notRobot"
                      name="notRobot"
                      className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                      required
                    />
                    <Label htmlFor="notRobot" className="ml-2">
                      I&#39;m not a robot
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => toast.success("Message sent successfully!")}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
