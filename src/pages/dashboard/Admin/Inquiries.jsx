import React from "react";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

export default function Inquiries() {
  const axiosSecure = useAxiosSecure();

  const { data: inquiries = [] } = useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("messages");
      return data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-6 bg-background">
      <Helmet>
        <title>Inquiries | Sync Force</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-green-800 mb-6">Public Inquiries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inquiries.map((inquiry, index) => (
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
            key={index}
          >
            <h3 className="text-lg font-semibold text-primary">
              {inquiry.email}
            </h3>
            <p className="text-black">{inquiry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}