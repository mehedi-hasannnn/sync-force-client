import React, { useState } from "react";
import { Zoom } from "react-awesome-reveal";
import ReactCardFlip from "react-card-flip";
import {
  FaCloud,
  FaShieldAlt,
  FaBolt,
  FaCogs,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Cloud-Based Access",
    description:
      "Work from anywhere with our fully cloud-hosted platform—secure, fast, and always available.",
    iconFront: <FaCloud className="text-white text-5xl" />,
    iconBack: "☁️",
    bgFront: "bg-blue-600",
    bgBack: "bg-blue-700",
  },
  {
    id: 2,
    title: "Top-Tier Security",
    description:
      "We prioritize your privacy with enterprise-grade encryption and secure authentication protocols.",
    iconFront: <FaShieldAlt className="text-white text-5xl" />,
    iconBack: "🛡️",
    bgFront: "bg-emerald-600",
    bgBack: "bg-emerald-700",
  },
  {
    id: 3,
    title: "Lightning Fast Sync",
    description:
      "Real-time data syncing ensures you're always working with the most up-to-date information.",
    iconFront: <FaBolt className="text-white text-5xl" />,
    iconBack: "⚡",
    bgFront: "bg-yellow-600",
    bgBack: "bg-yellow-700",
  },
  {
    id: 4,
    title: "Smart Integrations",
    description:
      "Effortlessly integrate with your favorite apps and services—no coding required.",
    iconFront: <FaCogs className="text-white text-5xl" />,
    iconBack: "⚙️",
    bgFront: "bg-purple-600",
    bgBack: "bg-purple-700",
  },
];

const FeaturesOverview = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Core Platform Features
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Unlock powerful tools built for modern workforce management—simple, secure, and scalable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Zoom cascade damping={0.1} triggerOnce>
            {features.map((feature) => (
              <ReactCardFlip
                key={feature.id}
                isFlipped={flippedCards[feature.id] || false}
                flipDirection="horizontal"
              >
                {/* Front Side */}
                <div
                  className={`flex flex-col items-center justify-center h-48 rounded-2xl shadow-lg p-6 cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 ${feature.bgFront}`}
                  onClick={() => handleFlip(feature.id)}
                >
                  {feature.iconFront}
                  <h3 className="text-white text-xl font-semibold mt-4">
                    {feature.title}
                  </h3>
                </div>

                {/* Back Side */}
                <div
                  className={`flex flex-col items-center justify-center h-48 rounded-2xl shadow-lg p-6 text-white cursor-pointer ${feature.bgBack}`}
                  onClick={() => handleFlip(feature.id)}
                >
                  <span className="text-4xl mb-2">{feature.iconBack}</span>
                  <p className="text-base">{feature.description}</p>
                </div>
              </ReactCardFlip>
            ))}
          </Zoom>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
