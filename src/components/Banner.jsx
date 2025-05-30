import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/working.json";

const Banner = () => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="mx-4 mt-6 lg:mt-12 lg:mx-16">
      <div className="w-full bg-[#111827] text-white rounded-xl py-16 px-8 flex flex-col lg:flex-row items-center justify-between shadow-xl">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Streamline Workforce Management with Confidence
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-8">
            Empower your organization with cutting-edge solutions tailored to enhance productivity, improve transparency, and foster collaboration across every level.
          </p>
          <button className="bg-emerald-400 hover:bg-[#6366f1] text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
            Explore Solutions
          </button>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Lottie options={lottieOptions} height={320} width={320} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
