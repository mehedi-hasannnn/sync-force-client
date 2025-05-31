import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import useAuth from "../../../customHooks/useAuth";
import { useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments/email/${user?.email}`);
      return response.data;
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  const sortedPayments = [...payments].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return months.indexOf(b.month) - months.indexOf(a.month);
  });

  const pageCount = Math.ceil(sortedPayments.length / itemsPerPage);
  const displayedPayments = sortedPayments.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet>
        <title>Payment History | Sync Force</title>
      </Helmet>

      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Payment History
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gradient-to-r from-primary to-accent text-white">
            <tr>
              <th className="px-6 py-4 font-medium">Month & Year</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Transaction ID</th>
              <th className="px-6 py-4 font-medium">Paying Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedPayments.map((payment, index) => (
              <tr
                key={payment._id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-6 py-4">
                  {payment.month}, {payment.year}
                </td>
                <td className="px-6 py-4">${payment.salary}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {payment.paymentStatus === "paid" ? "Paid" : "Not Paid"}
                  </span>
                </td>
                <td className="px-6 py-4">{payment.transactionId || "N/A"}</td>
                <td className="px-6 py-4">{payment.payingDate}</td>
              </tr>
            ))}
            {displayedPayments.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-6 text-center text-gray-500 italic"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex gap-2 items-center"}
          pageClassName={
            "px-4 py-2 border rounded-md text-gray-700 hover:bg-primary hover:text-white transition"
          }
          activeClassName={"bg-primary text-white font-bold"}
          previousClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-primary hover:text-white transition"
          }
          nextClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-primary hover:text-white transition"
          }
          breakLabel={"..."}
          breakClassName={"text-gray-500"}
        />
      </div>
    </div>
  );
}
