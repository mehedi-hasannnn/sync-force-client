import { Helmet } from "react-helmet-async";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelopeOpenText } from "react-icons/fa";
import { useState } from "react";
import useAxiosPublic from "../../customHooks/useAxiosPublic";
import Lottie from "lottie-react";
import contactus from "../../assets/contactus.json"; // adjust path if needed

const ContactPage = () => {
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
      setStatus("Message sent successfully!");
    } else {
      setStatus("Failed to send message.");
    }

    setTimeout(() => setStatus(""), 3000);
    e.target.reset();
  };

  return (
    <div className="py-10 bg-[#f9fbfc]">
      <Helmet>
        <title>Contact | Sync Force</title>
      </Helmet>

      {/* Section Header */}
      <div className="text-center max-w-5xl mx-auto mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4">
          Get in Touch with Us
        </h2>
        <p className="text-gray-600 text-lg md:w-3/4 mx-auto">
          Whether you're curious about features, want to share feedback, or just say hello — we’d love to hear from you.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Lottie Animation and Contact Info */}
        <div className="p-6 lg:p-10 bg-[#f1f5f9] flex flex-col justify-between">
          <Lottie animationData={contactus} loop={true} className="w-full h-60 mb-8" />

          <div className="space-y-6 text-gray-700">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-indigo-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Office Location</h4>
                <p>123 Innovation Drive, Tech City, TC 98765</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-indigo-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Call Us</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelopeOpenText className="text-indigo-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p>support@syncforce.io</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-800 font-medium mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-800 font-medium mb-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md"
            >
              Send Message
            </button>
            {status && (
              <p className="text-center text-indigo-500 font-medium mt-2">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
