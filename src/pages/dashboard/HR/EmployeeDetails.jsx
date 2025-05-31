import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

export default function EmployeeDetails() {
  const { email } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: employeeData = {}, isPending } = useQuery({
    queryKey: ["employee", email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/employee-details/${email}`);
      return data;
    },
  });

  const { userDetails = {}, salaryHistory = [] } = employeeData;

  if (isPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Helmet>
        <title>{userDetails.name} | Sync Force</title>
      </Helmet>

      <h2 className="text-3xl font-semibold text-slate-700 mb-8 border-b pb-2">
        Employee Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-xl p-6 mb-10 border border-blue-100">
        <img
          src={userDetails.photo || "/default-avatar.png"}
          alt={userDetails.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
        />
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-slate-800">{userDetails.name}</h3>
          <p className="text-md text-blue-600">{userDetails.designation}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 border border-slate-100">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Salary History</h3>

        {salaryHistory.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salaryHistory.map((item) => ({
                ...item,
                label: `${item.month} ${item.year}`,
              }))}
              margin={{ top: 20, right: 20, left: 10, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#334155", fontSize: 12 }}
                label={{
                  value: "Month-Year",
                  position: "insideBottom",
                  dy: 20,
                  fill: "#334155",
                  fontSize: 14,
                }}
              />
              <YAxis
                tick={{ fill: "#334155", fontSize: 12 }}
                label={{
                  value: "Salary",
                  angle: -90,
                  position: "insideLeft",
                  dx: -10,
                  fill: "#334155",
                  fontSize: 14,
                }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#f1f5f9", borderColor: "#94a3b8" }}
                labelStyle={{ color: "#1e293b" }}
              />
              <Bar dataKey="salary" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-lg font-medium text-red-500">
            Salary history unavailable.
          </div>
        )}
      </div>
    </div>
  );
}
