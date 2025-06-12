import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import LoginForm from './login/LoginForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Admin from './login/Admin';
import StudentDashboard from './components/StudentDashboard';

// 🔐 Reusable ProtectedRoute component
const ProtectedRoute = ({ children, role: expectedRole, redirectTo }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('role');

  return isLoggedIn && userRole === expectedRole
    ? children
    : <Navigate to={redirectTo} />;
};

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={<Admin />} />

            {/* 🔐 Admin Protected Route */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="ADMIN" redirectTo="/admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 🔐 Student Protected Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="STUDENT" redirectTo="/login">
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
