import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gatway_PK);

export default function Payroll() {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const {
    data: payroll = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/payments");
      return data;
    },
  });

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  // sort payroll records with unpaid employees first
  const sortedPayroll = payroll.sort((a, b) => {
    if (a.paymentStatus === "paid" && b.paymentStatus !== "paid") {
      return 1;
    }
    if (a.paymentStatus !== "paid" && b.paymentStatus === "paid") {
      return -1;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Payroll | Sync Force</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-indigo-700 mb-8 border-b-2 border-indigo-300 pb-2">
        Employee Payroll
      </h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md bg-white border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-100">
            <tr>
              {["Name", "Salary", "Month", "Year", "Payment Date", "Pay"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-medium text-indigo-800 tracking-wide"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedPayroll.map((employee) => (
              <tr
                key={employee._id}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">
                  {employee.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  ${employee.salary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {employee.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {employee.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {employee.payingDate ? employee.payingDate : "Pending"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {employee.paymentStatus === "paid" ? (
                    <button
                      disabled
                      className="cursor-not-allowed bg-indigo-200 text-indigo-600 px-4 py-1 rounded-lg font-semibold"
                    >
                      Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => openModal(employee)}
                      className="bg-indigo-600 text-white px-4 py-1 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* payment modal */}
      <Elements stripe={stripePromise}>
        <PaymentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          employee={selectedEmployee}
          refetch={refetch}
        />
      </Elements>
    </div>
  );
}
