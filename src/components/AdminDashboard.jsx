import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch students');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Admin Dashboard</h1>
        {loading ? (
          <p>Loading students...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full table-auto border border-collapse">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border">Roll No</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Department</th>
                <th className="p-2 border">Division</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.rollNo} className="hover:bg-gray-100">
                  <td className="p-2 border text-center">{s.rollNo}</td>
                  <td className="p-2 border">{s.firstName} {s.middleName} {s.lastName}</td>
                  <td className="p-2 border">{s.email}</td>
                  <td className="p-2 border text-center">{s.department}</td>
                  <td className="p-2 border text-center">{s.division}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
