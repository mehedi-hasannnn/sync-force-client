import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCheck,
  FaLaptopCode,
  FaWallet,
  FaRegChartBar,
  FaPeopleArrows,
  FaChartPie,
  FaShieldAlt,
  FaFileAlt,
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Smart HR Management",
    description:
      "Seamlessly handle employee records, attendance, and engagement with powerful HR workflows.",
    icon: <FaUserCheck />,
    bgColor: "bg-[#1f2937]",
  },
  {
    id: 2,
    title: "Automated Task Scheduling",
    description:
      "Assign, monitor, and optimize tasks with intelligent scheduling to boost productivity.",
    icon: <FaLaptopCode />,
    bgColor: "bg-[#111827]",
  },
  {
    id: 3,
    title: "Secure Payroll System",
    description:
      "Ensure timely, accurate, and compliant payroll management with integrated financial tools.",
    icon: <FaWallet />,
    bgColor: "bg-[#1f2937]",
  },
  {
    id: 4,
    title: "Advanced Performance Insights",
    description:
      "Visualize employee performance through comprehensive dashboards and real-time KPIs.",
    icon: <FaRegChartBar />,
    bgColor: "bg-[#111827]",
  },
  {
    id: 5,
    title: "Collaborative Team Spaces",
    description:
      "Enhance internal communication with centralized chat, file sharing, and project updates.",
    icon: <FaPeopleArrows />,
    bgColor: "bg-[#1f2937]",
  },
  {
    id: 6,
    title: "Real-Time Workforce Analytics",
    description:
      "Make smarter decisions with real-time data analysis on staffing trends and resource use.",
    icon: <FaChartPie />,
    bgColor: "bg-[#111827]",
  },
  {
    id: 7,
    title: "Compliance & Audit Tools",
    description:
      "Stay audit-ready with policy tracking, digital documentation, and compliance monitoring.",
    icon: <FaShieldAlt />,
    bgColor: "bg-[#1f2937]",
  },
  {
    id: 8,
    title: "Custom Reports & Export",
    description:
      "Generate and export tailored reports to gain critical insights and support decisions.",
    icon: <FaFileAlt />,
    bgColor: "bg-[#111827]",
  },
];

export default function OurServices() {
  return (
    <section className="bg-[#0f172a] py-20 mt-5">
      <div className="mx-4 lg:mx-16 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Comprehensive Workforce Management Solutions
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          From recruitment to retirement, Sync Force empowers your HR and admin
          teams to manage operations efficiently with real-time insights and automation.
        </motion.p>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`flex flex-col items-center rounded-2xl p-6 ${service.bgColor} hover:bg-[#1e40af] transition duration-300 shadow-lg`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="text-4xl text-emerald-400 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-300 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
