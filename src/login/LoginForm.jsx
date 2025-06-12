import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/student/login', { username, password }, {
      headers: { 'Content-Type': 'application/json' },
    });

    const { role } = response.data;
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', role);

    if (role === 'ADMIN') {
      window.location.href = '/admin-dashboard';
    } else {
      window.location.href = '/';
    }
  } catch (err) {
    setError('Invalid username or password. Please try again.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Login Form */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6 text-black">Login</h1>

          {error && (
            <div className="mb-4 text-red-600 text-sm font-semibold">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-700">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter Username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="********"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 transition-colors"
            >
              LOGIN
            </button>

            <div className="text-sm mt-2">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>

        {/* Right - Illustration */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="/EthiCraft.png"
            alt="Login illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
