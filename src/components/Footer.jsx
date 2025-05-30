import React from "react";
import companyLogo from "../assets/work.svg"; 
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <h1 className="text-3xl text-emerald-400 font-bold mb-4">Sync Force</h1>
            <img className="mb-2" src={companyLogo} width={40} alt="company logo" />
            <p className="text-white text-sm leading-relaxed">
              Empowering organizations to streamline workforce operations with
              intuitive tools, seamless collaboration, and data-driven insights
              for growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-accent transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-accent transition">
                  Features
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-accent transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4 text-xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-semibold">Address:</span> 123 SyncForce
                Lane, Business City, BZ 56789
              </li>
              <li>
                <span className="font-semibold">Phone:</span> +123-456-7890
              </li>
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:contact@syncforce.com"
                  className="hover:text-accent transition"
                >
                  contact@syncforce.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white mt-10"></div>

        {/* Copyright */}
        <p className="text-center text-sm text-emerald-400 mt-6">
          &copy; {new Date().getFullYear()} Sync Force. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
