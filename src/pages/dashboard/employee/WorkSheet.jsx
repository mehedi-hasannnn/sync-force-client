import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { useForm, Controller } from "react-hook-form";
import { FiEdit, FiTrash } from "react-icons/fi";
import useAuth from "../../../customHooks/useAuth";
import useTasks from "../../../customHooks/useTasks";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../customHooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function WorkSheet() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tasks, loading, refetch] = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const mainForm = useForm();
  const { register, handleSubmit, control, reset } = mainForm;

  const modalForm = useForm();
  const {
    register: modalRegister,
    handleSubmit: modalHandleSubmit,
    control: modalControl,
    setValue,
  } = modalForm;

  const onSubmit = async (data) => {
    const newTask = {
      employee_name: user.displayName,
      employee_email: user.email,
      task: data.task,
      hours: data.work_duration,
      date: data.date,
    };
    const { data: task } = await axiosSecure.post("/tasks", newTask);
    if (task.insertedId) {
      toast.success("Task added successfully");
      reset();
      refetch();
    }
  };

  const handleDeleteTask = async (task) => {
    const { data } = await axiosSecure.delete(`/tasks/${task._id}`);
    if (data.deletedCount > 0) {
      toast.error("Task deleted successfully");
      refetch();
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setValue("edit_task", task.task);
    setValue("edit_work_duration", task.hours);
    setValue("edit_date", new Date(task.date));
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (data) => {
    const updatedTask = {
      task: data.edit_task,
      hours: data.edit_work_duration,
      date: data.edit_date,
    };
    const { data: updated } = await axiosSecure.patch(
      `/tasks/${selectedTask._id}`,
      updatedTask
    );
    if (updated.modifiedCount > 0) {
      toast.success("Successfully updated");
      refetch();
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 md:p-6 bg-[#f9fafb] min-h-screen">
      <Helmet>
        <title>Work Sheet | Sync Force</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Work Sheet
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-stretch gap-4 mb-8"
      >
        <select
          {...register("task", { required: true })}
          defaultValue={""}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/4 text-sm bg-white"
          disabled={isModalOpen}
        >
          <option disabled value={""}>
            Select Your Task
          </option>
          <option>Sales</option>
          <option>Support</option>
          <option>Content</option>
          <option>Paper-work</option>
        </select>

        <input
          type="number"
          {...register("work_duration", { required: true })}
          placeholder="Hours Worked"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/4 text-sm"
          disabled={isModalOpen}
        />

        <Controller
          name="date"
          control={control}
          defaultValue={new Date()}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
  selected={field.value}
  onChange={(date) => field.onChange(date)}
  className="border border-gray-300 p-2 rounded-md text-sm w-full max-w-md lg:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
  disabled={isModalOpen}
  dateFormat="MMMM d, yyyy"
  showMonthDropdown
  showYearDropdown
  dropdownMode="select"
/>

          )}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
          disabled={isModalOpen}
        >
          Add
        </button>
      </form>

      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Task</th>
              <th className="p-3 text-left">Hours</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{task.task}</td>
                <td className="p-3">{task.hours}</td>
                <td className="p-3">{new Date(task.date).toDateString()}</td>
                <td className="p-3 flex justify-center gap-4">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => openEditModal(task)}
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Task"
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Task</h2>
        <form onSubmit={modalHandleSubmit(handleEditSubmit)}>
          <select
            {...modalRegister("edit_task", { required: true })}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 text-sm"
          >
            <option>Sales</option>
            <option>Support</option>
            <option>Content</option>
            <option>Paper-work</option>
          </select>

          <input
            type="number"
            {...modalRegister("edit_work_duration", { required: true })}
            placeholder="Hours Worked"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 text-sm"
          />

          <Controller
            name="edit_date"
            control={modalControl}
            defaultValue={new Date()}
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
  selected={field.value}
  onChange={(date) => field.onChange(date)}
  className="border border-gray-300 p-2 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary"
  dateFormat="MMMM d, yyyy"
  showMonthDropdown
  showYearDropdown
  dropdownMode="select"
/>

            )}
          />

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
