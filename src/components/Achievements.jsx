import { motion } from "framer-motion";
import {
  FaGlobe,
  FaHandshake,
  FaUsersCog,
  FaMedal,
} from "react-icons/fa";

export default function Achievements() {
  const stats = [
    {
      id: 1,
      value: "12+",
      label: "Global Partnerships",
      icon: <FaGlobe />,
      bgColor: "bg-blue-600",
    },
    {
      id: 2,
      value: "250+",
      label: "Satisfied Clients",
      icon: <FaHandshake />,
      bgColor: "bg-green-600",
    },
    {
      id: 3,
      value: "75K+",
      label: "Employees Empowered",
      icon: <FaUsersCog />,
      bgColor: "bg-purple-600",
    },
    {
      id: 4,
      value: "8",
      label: "Prestigious Awards",
      icon: <FaMedal />,
      bgColor: "bg-yellow-500",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="mx-4 lg:mx-14 text-center">
        {/* Section Heading */}
        <motion.h2
          className="text-gray-800 text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Milestones That Reflect Our Journey
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-6 md:mb-12 md:w-10/12 lg:w-7/12 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Every achievement is a story of dedication, collaboration, and
          relentless pursuit of excellence. Here’s a glimpse of the impact
          we’ve made together over the years.
        </motion.p>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-md ${stat.bgColor} hover:scale-105 transition-transform`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
            >
              <div className="text-5xl text-white mb-3">{stat.icon}</div>
              <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-base font-medium text-white">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ending code snippet