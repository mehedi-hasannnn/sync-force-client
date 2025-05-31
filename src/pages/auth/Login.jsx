import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";
import GoogleLogin from "../../components/auth/GoogleLogin";
import useAuth from "../../customHooks/useAuth";
import useAxiosPublic from "../../customHooks/useAxiosPublic";

export default function Login() {
  const axiosPublic = useAxiosPublic();
  const { loginUser, setUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    try {
      const { data: userStatus } = await axiosPublic.get(
        `/users/fired-status?email=${email}`
      );

      if (userStatus.isFired) {
        toast.error("Your account is disabled. Please contact support.");
        return;
      }

      loginUser(email, password)
        .then((result) => {
          const user = result.user;
          setUser(user);
          navigate(from, { replace: true });
          toast.success("Successfully Login");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error("Account not found");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 p-4">
      <Helmet>
        <title>Login | Sync Force</title>
      </Helmet>
      <div className="flex flex-col lg:flex-row w-full max-w-5xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl rounded-3xl overflow-hidden">
        {/* Left Side */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center text-white">
          <h2 className="text-4xl font-bold mb-6 text-accent">Welcome Back!</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-xl bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-xl bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-8 right-4 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-accent hover:bg-accent/90 rounded-xl font-semibold text-white transition duration-300"
            >
              {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Login"}
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 bg-accent text-white p-8 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-md"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <Lottie animationData={loginAnimation} className="w-72 h-48 mb-4" />
            <GoogleLogin />
            <p className="mt-6 text-sm">
              Don’t have an account?{" "}
              <Link to="/auth/register" className="font-semibold underline hover:text-white/80">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
