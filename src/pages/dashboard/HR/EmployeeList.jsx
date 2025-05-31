import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import PayModal from "./PayModal";

export default function EmployeeList() {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeForModal, setEmployeeForModal] = useState(null);

  const {
    data: employeeData = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?role=Employee`);
      return data;
    },
  });

  const handleVerified = async (user) => {
    const updatedUser = { isVerified: !user.isVerified };
    const { data: updated } = await axiosSecure.patch(
      `/users/${user._id}`,
      updatedUser
    );
    if (updated.modifiedCount > 0) {
      updatedUser.isVerified
        ? toast.success("User successfully verified!")
        : toast.error("User unverified successfully!");
      refetch();
    }
  };

  const handlePayRequest = async (data) => {
    const newPayment = {
      name: employeeForModal.name,
      email: employeeForModal.email,
      salary: employeeForModal.salary,
      month: data.month,
      year: data.year,
      paymentStatus: "pending",
      transactionId: "",
      payingDate: "",
    };

    try {
      const response = await axiosSecure.post("/payments", newPayment);
      if (response.status === 201) {
        toast.success("Payment request sent to Admin");
        setIsModalOpen(false);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(
          `Payment for ${employeeForModal.name} already exists for ${data.month} ${data.year}.`
        );
      } else {
        toast.error("Failed to send payment request.");
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Verified",
        accessorKey: "isVerified",
        cell: ({ row }) => (
          <button
            className={`px-3 py-1 rounded-full text-white transition ${
              row.original.isVerified
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-rose-500 hover:bg-rose-600"
            }`}
            onClick={() => handleVerified(row.original)}
          >
            {row.original.isVerified ? (
              <AiOutlineCheck size={18} />
            ) : (
              <AiOutlineClose size={18} />
            )}
          </button>
        ),
      },
      {
        header: "Bank Account",
        accessorKey: "bank_account_no",
      },
      {
        header: "Salary",
        accessorKey: "salary",
        cell: ({ row }) => `$${row.original.salary.toLocaleString()}`,
      },
      {
        header: "Pay",
        cell: ({ row }) => (
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              row.original.isVerified
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => {
              if (row.original.isVerified) {
                setEmployeeForModal(row.original);
                setIsModalOpen(true);
              }
            }}
            disabled={!row.original.isVerified}
          >
            Pay
          </button>
        ),
      },
      {
        header: "Details",
        cell: ({ row }) => (
          <Link to={`/dashboard/employee-details/${row.original.email}`}>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition">
              Details
            </button>
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: employeeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Employees | Sync Force</title>
      </Helmet>
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Employee List
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-4 text-left font-medium">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pay Modal */}
        <PayModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          employee={employeeForModal}
          onPay={handlePayRequest}
        />
      </div>
    </>
  );
}
