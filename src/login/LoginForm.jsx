import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser, FiLock } from 'react-icons/fi';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      'http://localhost:8080/student/login',
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { role, username:loggedInUsername } = response.data;

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('username', loggedInUsername);

    window.location.href = role === 'ADMIN' ? '/admin-dashboard' : '/dashboard';
  } catch (err) {
    setError('Invalid username or password. Please try again.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-6 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white bg-opacity-40 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/30">
        
        {/* Left Side - Form */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4">Student Login</h1>
          <p className="text-gray-600 text-sm mb-6">Please enter your PRN and password.</p>

          {error && (
            <div className="mb-4 text-red-600 text-sm font-semibold bg-red-50 p-2 rounded shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pt-5 pb-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                required
              />
              <label
                htmlFor="username"
                className="absolute left-10 top-2 text-sm text-gray-500 peer-focus:text-blue-600 peer-focus:text-xs peer-focus:top-1 transition-all"
              >
                Mobile Number
              </label>
            </div>

            {/* Password Field */}
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pt-5 pb-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-10 top-2 text-sm text-gray-500 peer-focus:text-blue-600 peer-focus:text-xs peer-focus:top-1 transition-all"
              >
                Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Forgot Password */}
            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() =>
                  toast.info("Hey, couldn't you remember your PRN Number? 😅")
                }
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Logo */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-bl from-blue-200 to-blue-300">
          <img
            src="/EthiCraft.png"
            alt="EthiCraft Logo"
            className="w-60 h-60 object-contain drop-shadow-xl"
          />
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} theme="colored" transition={Zoom} />
    </div>
  );
}
