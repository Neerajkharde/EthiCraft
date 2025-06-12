import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
      location.pathname === path
        ? 'bg-blue-800 text-white shadow-inner'
        : 'text-blue-900 hover:bg-yellow-300 hover:text-blue-950'
    }`;

  return (
    <nav className="bg-yellow-400 shadow-lg">
      <div className="max-w-6xl mx-auto py-2 px-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-3xl font-extrabold tracking-wide text-blue-900 drop-shadow-md">
          <span className="text-blue-800">Ethi</span>
          <span className="text-purple-700">Craft</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 text-sm md:text-lg">
          <Link to="/" className={linkClasses('/')}>Home</Link>
          <Link to="/register" className={linkClasses('/register')}>Register</Link>
          <Link to="/login" className={linkClasses('/login')}>Login</Link>
          <Link to="/admin" className={linkClasses('/admin')}>Admin</Link> {/* Always visible */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
