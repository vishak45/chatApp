import React from "react";
import { Link } from "react-router-dom";

function Loginpage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100 dark:border-gray-700">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
          Log in to continue your conversations
        </p>

        {/* Login form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>

        {/* Link to register */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Loginpage;
