import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/admin/login', {
        email,
        password
      });

      const { role } = response.data;

      if (role === 'ADMIN') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', 'ADMIN');
        navigate('/admin-dashboard');
      } else {
        setError('Access denied: Not an admin user.');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Admin Login</h2>
          <p className="text-gray-600 mb-6">Enter your admin credentials to access the dashboard.</p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="********"
              className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition duration-200"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Right Side - Illustration */}
        <div className="w-full md:w-1/2 bg-green-50 flex flex-col items-center justify-center p-8">
          <img
            src="/EthiCraft.png"
            alt="Admin Panel"
            className="w-3/4 max-w-xs mb-4"
          />
          <p className="text-center text-gray-600 text-sm">
            Need an account? Contact us at <br />
            <span className="text-green-600 font-semibold">ethicraft101@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
