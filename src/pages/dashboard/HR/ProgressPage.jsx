import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function ProgressPage() {
  const axiosSecure = useAxiosSecure();
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const { data: tasksData = [], isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosSecure.get("/tasks");
      return response.data;
    },
  });

  // filter tasks data based on employee, month, and year
  useEffect(() => {
    const filtered = tasksData.filter((task) => {
      const matchesEmployee = selectedEmployee
        ? task.employee_name === selectedEmployee
        : true;
      const matchesMonth = selectedMonth
        ? new Date(task.date).toLocaleString("en-US", { month: "long" }) ===
          selectedMonth
        : true;
      const matchesYear = selectedYear
        ? new Date(task.date).getFullYear().toString() === selectedYear
        : true;
      return matchesEmployee && matchesMonth && matchesYear;
    });
    setFilteredRecords(filtered);
  }, [selectedEmployee, selectedMonth, selectedYear, tasksData]);

  // dynamic employee name for the dropdown
  const employeeNames = [
    ...new Set(tasksData.map((task) => task.employee_name)),
  ];

  // dynamic years from the data
  const years = [
    ...new Set(tasksData.map((task) => new Date(task.date).getFullYear())),
  ];

  // months for dropdown
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>Progress | WorkForce Pro</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-primary mb-6">Progress Records</h2>

      {/* filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* employee name */}
        <div>
          <label
            htmlFor="employee"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Employee
          </label>
          <select
            id="employee"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {employeeNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* month filter */}
        <div>
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Month
          </label>
          <select
            id="month"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* year filter */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by Year
          </label>
          <select
            id="year"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Month
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Year
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Work Description
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record._id} className="even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.employee_name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {new Date(record.date).toLocaleString("en-US", {
                    month: "long",
                  })}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {new Date(record.date).getFullYear()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  {record.task}
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="border border-gray-300 px-4 py-2 text-center text-sm text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}