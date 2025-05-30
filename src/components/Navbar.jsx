import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../customHooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const { user, logoutUser, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setUser(null);
        toast.success("Logged out successfully");
        setDropdownOpen(false);
      })
      .catch((error) => console.log(error.message));
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold px-3 py-2 rounded-md bg-emerald-600"
      : "text-slate-100 font-medium px-3 py-2 hover:bg-emerald-700/20 rounded-md transition";

  return (
    <nav className="bg-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <NavLink to="/" className="text-2xl font-bold tracking-wide text-emerald-400">
          Sync Force
        </NavLink>

        {/* Mobile menu toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>
            Contact Us
          </NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={getNavLinkClass}>
                Dashboard
              </NavLink>
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                  referrerPolicy="no-referrer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-slate-800 rounded-lg shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-center py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              <NavLink
                to="/auth/login"
                className="bg-emerald-600 px-4 py-2 rounded-md text-white hover:bg-emerald-700 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="bg-emerald-700 px-4 py-2 rounded-md text-white hover:bg-emerald-800 transition"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-white text-slate-800 transform transition-transform duration-300 z-40 shadow-lg ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-emerald-600">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <svg
              className="w-6 h-6 text-slate-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="p-4 space-y-4">
          <li>
            <Link
              to="/"
              className="block text-lg text-slate-800 hover:text-emerald-600"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block text-lg text-slate-800 hover:text-emerald-600"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="block text-lg text-slate-800 hover:text-emerald-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/auth/login"
                  className="block w-full bg-emerald-600 text-white text-center py-2 rounded-md hover:bg-emerald-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth/register"
                  className="block w-full bg-emerald-700 text-white text-center py-2 rounded-md hover:bg-emerald-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
