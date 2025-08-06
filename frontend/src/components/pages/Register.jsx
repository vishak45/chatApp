import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../lib/useAuth";
function Register() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { register, setMsg,success} = useAuth();
  useEffect(() => {
    if (success&&success===true) {
      setMsg();
      navigate("/login");

    }
  }, [success]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          Join now and start chatting instantly 🚀
        </p>

        <form className="space-y-5">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-3">
            {/* Preview Image */}
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-300 dark:border-gray-600">
              {image ? (
                <img
                  src={image}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 dark:text-gray-500 text-xs">
                  No Image
                </span>
              )}
            </div>

            {/* Remove Button */}
            {image && (
              <button
                type="button"
                onClick={() => setImage(null)}
                className="border border-gray-300 dark:border-gray-600 rounded-full px-4 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Remove
              </button>
            )}

            {/* Hidden File Input */}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => setImage(reader.result);
                }
              }}
            />

            {/* Upload Button */}
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
            >
              Choose Photo
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
