import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully!');
    setTimeout(() => navigate('/'), 1500);
  };

  const linkClasses = (path) =>
    `px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
      location.pathname === path
        ? 'bg-blue-800 text-white shadow-inner'
        : 'text-blue-900 hover:bg-yellow-300 hover:text-blue-950'
    }`;

  return (
    <nav className="bg-yellow-400 shadow-lg z-50 sticky top-0">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-blue-900 drop-shadow-md">
          <span className="text-blue-800">Ethi</span>
          <span className="text-purple-700">Craft</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className={linkClasses('/')}>Home</Link>

          {!isLoggedIn && (
            <>
              <Link to="/register" className={linkClasses('/register')}>Register</Link>
              <div
                className="relative"
                onMouseEnter={() => setLoginOpen(true)}
                onMouseLeave={() => setLoginOpen(false)}
              >
                <button className={`${linkClasses('/login')} inline-flex items-center gap-1`}>
                  Login
                  <svg className={`w-4 h-4 transition-transform duration-200 ${loginOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`absolute top-full left-0 mt-1 w-48 bg-white text-blue-900 shadow-md rounded-md transition-all duration-200 transform ${
                  loginOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                }`}>
                  <Link to="/login" className="block px-4 py-2 hover:bg-yellow-200">Student Login</Link>
                  <Link to="/admin" className="block px-4 py-2 hover:bg-yellow-200">Admin Login</Link>
                </div>
              </div>
            </>
          )}

          {isLoggedIn && role === 'STUDENT' && (
            <Link to="/dashboard" className={linkClasses('/dashboard')}>Dashboard</Link>
          )}
          {isLoggedIn && role === 'ADMIN' && (
            <Link to="/admin-dashboard" className={linkClasses('/admin-dashboard')}>Admin</Link>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 font-semibold"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-blue-900 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-yellow-200 border-t border-yellow-300 px-4 py-4 space-y-2">
          <Link to="/" className={linkClasses('/')}>Home</Link>

          {!isLoggedIn && (
            <>
              <Link to="/register" className={linkClasses('/register')}>Register</Link>
              <div className="space-y-1">
                <button
                  onClick={() => setLoginOpen(!loginOpen)}
                  className={`${linkClasses('/login')} w-full text-left flex justify-between items-center`}
                >
                  Login
                  <svg className={`w-4 h-4 transform transition-transform ${loginOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {loginOpen && (
                  <div className="bg-white rounded-md shadow-sm overflow-hidden">
                    <Link to="/login" className="block px-4 py-2 text-blue-900 hover:bg-yellow-300">Student Login</Link>
                    <Link to="/admin" className="block px-4 py-2 text-blue-900 hover:bg-yellow-300">Admin Login</Link>
                  </div>
                )}
              </div>
            </>
          )}

          {isLoggedIn && role === 'STUDENT' && (
            <Link to="/dashboard" className={linkClasses('/dashboard')}>Dashboard</Link>
          )}
          {isLoggedIn && role === 'ADMIN' && (
            <Link to="/admin-dashboard" className={linkClasses('/admin-dashboard')}>Admin</Link>
          )}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={1500} />
    </nav>
  );
};

export default Navbar;
