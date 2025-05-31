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

  useEffect(() => {
    const filtered = tasksData.filter((task) => {
      const matchesEmployee = selectedEmployee
        ? task.employee_name === selectedEmployee
        : true;
      const matchesMonth = selectedMonth
        ? new Date(task.date).toLocaleString("en-US", { month: "long" }) === selectedMonth
        : true;
      const matchesYear = selectedYear
        ? new Date(task.date).getFullYear().toString() === selectedYear
        : true;
      return matchesEmployee && matchesMonth && matchesYear;
    });
    setFilteredRecords(filtered);
  }, [selectedEmployee, selectedMonth, selectedYear, tasksData]);

  const employeeNames = [...new Set(tasksData.map((task) => task.employee_name))];
  const years = [...new Set(tasksData.map((task) => new Date(task.date).getFullYear()))];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Progress | Sync Force</title>
      </Helmet>

      <h2 className="text-3xl font-semibold text-slate-800 mb-8 border-b pb-2 border-slate-200">
        📈 Progress Records
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-8">
        {/* Employee Filter */}
        <div className="flex flex-col">
          <label htmlFor="employee" className="mb-1 text-sm font-medium text-slate-700">
            Filter by Employee
          </label>
          <select
            id="employee"
            className="border border-slate-300 rounded-lg shadow-sm px-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">All Employees</option>
            {employeeNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Month Filter */}
        <div className="flex flex-col">
          <label htmlFor="month" className="mb-1 text-sm font-medium text-slate-700">
            Filter by Month
          </label>
          <select
            id="month"
            className="border border-slate-300 rounded-lg shadow-sm px-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="flex flex-col">
          <label htmlFor="year" className="mb-1 text-sm font-medium text-slate-700">
            Filter by Year
          </label>
          <select
            id="year"
            className="border border-slate-300 rounded-lg shadow-sm px-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-100 border-b border-slate-300">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Month</th>
              <th className="px-6 py-3 font-medium">Year</th>
              <th className="px-6 py-3 font-medium">Work Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record._id} className="border-b last:border-none hover:bg-slate-50 transition">
                  <td className="px-6 py-3">{record.employee_name}</td>
                  <td className="px-6 py-3">
                    {new Date(record.date).toLocaleString("en-US", { month: "long" })}
                  </td>
                  <td className="px-6 py-3">{new Date(record.date).getFullYear()}</td>
                  <td className="px-6 py-3">{record.task}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-6 py-4 text-slate-500">
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
