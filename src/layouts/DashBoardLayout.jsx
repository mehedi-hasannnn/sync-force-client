import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaTasks,
  FaChartLine,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import useRole from "../customHooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../customHooks/useAuth";

export default function DashBoardLayout() {
  const { user } = useAuth();
  const [role, loading] = useRole();
  const { isAdmin, isHR, isEmployee } = role || {};
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (loading) return <LoadingSpinner />;

  const renderNavLink = (to, icon, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-2 px-4 rounded-xl transition-all ${
          isActive ? "bg-indigo-600 text-white" : "hover:bg-indigo-700 text-indigo-100"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );

  const navLinks = (
    <nav className="space-y-3 text-base font-medium">
      {isEmployee && (
        <>
          {renderNavLink("work-sheet", <FaTasks className="text-lg" />, "Work Sheet")}
          {renderNavLink("payment-history", <FaMoneyCheckAlt className="text-lg" />, "Payment History")}
        </>
      )}

      {isHR && (
        <>
          {renderNavLink("employee-list", <FaUsers className="text-lg" />, "Employee List")}
          {renderNavLink("progress", <FaChartLine className="text-lg" />, "Progress")}
        </>
      )}

      {isAdmin && (
        <>
          {renderNavLink("all-employees", <FaUsers className="text-lg" />, "All Employees")}
          {renderNavLink("payroll", <FaMoneyCheckAlt className="text-lg" />, "Payroll")}
          {renderNavLink("inquiries", <FaRegMessage className="text-lg" />, "Inquiries")}
        </>
      )}

      <div className="border-t border-indigo-700 my-4"></div>

      {user && renderNavLink("/", <FaHome className="text-lg" />, "Home")}
    </nav>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-text">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-gray-100 p-6 sticky top-0 h-screen overflow-y-auto">
        <Link to="/" className="mb-6">
          <h2 className="text-2xl font-bold tracking-wide">Sync Force</h2>
        </Link>
        {navLinks}
      </aside>

      {/* Mobile Navbar */}
      <nav className="lg:hidden flex items-center justify-between bg-indigo-800 text-indigo-100 p-4 sticky top-0 z-30">
        <Link to="/" className="text-xl font-bold">
          Sync Force
        </Link>
        <button onClick={() => setIsDrawerOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="fixed top-0 right-0 h-full w-64 bg-slate-900 text-gray-100 p-6 z-50 shadow-xl overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsDrawerOpen(false)}>
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <Link to="/" className="block mb-6">
              <h2 className="text-2xl font-bold tracking-wide">Sync Force</h2>
            </Link>
            {navLinks}
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
}
