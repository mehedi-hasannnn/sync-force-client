import React from "react";
import Marquee from "react-fast-marquee";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Alex D. Barrett",
    title: "CEO, TechNova",
    feedback:
      "Sync Force has redefined our operations. The user experience is flawless, and the automation tools have saved us countless hours.",
    image: "https://i.ibb.co/B57jwtVK/client1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "HR Lead, SoftSolutions",
    feedback:
      "A game-changer for our HR team. Seamless onboarding, smart analytics, and phenomenal support!",
    image: "https://i.ibb.co/NdfSh6bV/client2.jpg",
  },
  {
    id: 3,
    name: "Emily Davis",
    title: "Director of Ops, FlowEdge",
    feedback:
      "The payroll tools and employee tracking system have streamlined everything. Truly impressive work.",
    image: "https://i.ibb.co/xKvjLC8W/client3.jpg",
  },
  {
    id: 4,
    name: "Micheal Reed",
    title: "Project Manager, InnovateX",
    feedback:
      "Real-time insights and KPI tracking make team performance easy to monitor. Highly recommended!",
    image: "https://i.ibb.co/q38p3ynF/client4.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="mx-4 lg:mx-14 text-center">
        {/* Section Header */}
        <h2 className="text-gray-800 text-3xl md:text-4xl font-bold mb-6">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 mb-12 md:w-10/12 lg:w-7/12 mx-auto">
          We’re proud to support industry leaders with solutions that
          drive impact. Here’s what our partners are saying about their
          experience with Sync Force.
        </p>

        {/* Marquee Slider */}
        <Marquee gradient={false} speed={60} pauseOnHover={true}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col items-center justify-between w-72 bg-white rounded-xl shadow-lg mx-4 px-6 py-8 border border-gray-200"
            >
              <FaQuoteLeft className="text-2xl text-primary mb-3" />
              <p className="text-gray-700 text-sm italic mb-6">
                {testimonial.feedback}
              </p>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-2 border-2 border-primary object-cover"
              />
              <h3 className="text-base font-semibold text-gray-900">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial.title}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
