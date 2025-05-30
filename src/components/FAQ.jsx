import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What features does Sync Force offer?",
      answer:
        "Sync Force includes employee management, payroll processing, HR automation, performance tracking, team collaboration, and compliance management tools.",
    },
    {
      id: 2,
      question: "Is Sync Force compatible with mobile devices?",
      answer:
        "Absolutely. Our platform is fully responsive and works seamlessly across desktops, tablets, and mobile phones.",
    },
    {
      id: 3,
      question: "How secure is the data in Sync Force?",
      answer:
        "We implement enterprise-grade encryption and cloud security standards, ensuring full compliance with GDPR and other global regulations.",
    },
    {
      id: 4,
      question: "What industries is Sync Force best suited for?",
      answer:
        "Sync Force is built for industries like HR, healthcare, education, tech, and manufacturing—essentially any sector where managing people and performance is a priority.",
    },
    {
      id: 5,
      question: "How can I get support for Sync Force?",
      answer:
        "Our support team is available 24/7 via chat, email, and phone. You’ll also find detailed guides and video tutorials in our help center.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Sync Force—our features, security,
            support, and compatibility.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 bg-white text-left text-lg font-medium text-gray-900 focus:outline-none hover:bg-gray-50 transition"
              >
                {faq.question}
                {activeIndex === index ? (
                  <FaChevronUp className="text-primary" />
                ) : (
                  <FaChevronDown className="text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="px-6 pb-5 pt-2 bg-gray-50 text-gray-700"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
