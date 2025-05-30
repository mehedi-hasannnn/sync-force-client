import React, { useState } from "react";
import { FaLocationArrow, FaPhoneSquareAlt, FaRegEnvelopeOpen } from "react-icons/fa";
import useAxiosPublic from "../customHooks/useAxiosPublic";

const ContactUs = () => {
  const axiosPublic = useAxiosPublic();
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const message = form.get("message");
    const newMessage = { email, message };
    const { data } = await axiosPublic.post("/messages", newMessage);

    if (data.insertedId) {
      setStatus("Message sent successfully");
      setTimeout(() => setStatus(""), 3000);
    } else {
      setStatus("Message failed");
      setTimeout(() => setStatus(""), 3000);
    }
    e.target.reset();
  };

  return (
    <div className="py-12 bg-[#f8fafc]">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto bg-white pt-6 rounded-t-xl shadow-md">
        <h2 className="text-[#1d3557] text-4xl font-extrabold mb-4">
          Get in Touch with Us
        </h2>
        <p className="text-[#6c757d] pb-6 md:pb-8 md:w-10/12 lg:w-7/12 mx-auto border-b border-gray-200">
          Have questions or feedback? We’re here to help. Reach out to us and
          our team will respond as soon as possible.
        </p>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center bg-[#f8fafc]">
        <div className="max-w-4xl w-full bg-white rounded-b-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="p-8 md:border-r border-gray-200 bg-[#f1f5f9]">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FaLocationArrow className="text-[#457b9d] text-2xl mt-1" />
                  <div>
                    <p className="text-gray-800 font-semibold">Our Office</p>
                    <p className="text-gray-600 text-sm">
                      123 Fitness Blvd, Wellness City, WC 45678
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaPhoneSquareAlt className="text-[#457b9d] text-2xl mt-1" />
                  <div>
                    <p className="text-gray-800 font-semibold">Call Us</p>
                    <p className="text-gray-600 text-sm">+1 (800) 555-6789</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaRegEnvelopeOpen className="text-[#457b9d] text-2xl mt-1" />
                  <div>
                    <p className="text-gray-800 font-semibold">Email Us</p>
                    <p className="text-gray-600 text-sm">
                      support@sportstore.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#457b9d] focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#457b9d] focus:outline-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1d3557] hover:bg-[#264c80] text-white font-semibold py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
                >
                  Send Message
                </button>
                {status && (
                  <p className="text-center text-[#38b000] font-medium mt-2">
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
