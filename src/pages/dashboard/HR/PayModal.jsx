import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

Modal.setAppElement("#root");

export default function PayModal({ isOpen, onClose, employee, onPay }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePay = (data) => {
    onPay(data);
    reset();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  if (!employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Pay Employee Modal"
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldReturnFocusAfterClose={true}
      className="max-w-md mx-auto mt-20 bg-white rounded-xl shadow-xl outline-none p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Pay {employee.name}
        </h2>
        <p className="text-gray-600">Salary: ${employee.salary}</p>

        <form onSubmit={handleSubmit(handlePay)} className="space-y-4">
          <div>
            <label htmlFor="month" className="block mb-1 text-sm font-medium text-gray-700">
              Month
            </label>
            <select
              id="month"
              {...register("month", { required: "Month is required" })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Month</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            {errors.month && (
              <p className="text-sm text-red-500 mt-1">{errors.month.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="year" className="block mb-1 text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              id="year"
              type="number"
              placeholder="Enter Year"
              {...register("year", { required: "Year is required" })}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.year && (
              <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors"
          >
            Pay
          </button>
        </form>
      </div>
    </Modal>
  );
}
