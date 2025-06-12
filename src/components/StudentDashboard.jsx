import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const mobileNo = localStorage.getItem("username");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/student/${mobileNo}`
        );
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoading(false);
      }
    };

    if (mobileNo) fetchStudent();
    else setLoading(false);
  }, [mobileNo]);

  if (loading) {
    return <p className="text-center p-10">Loading student data...</p>;
  }

  if (!student || !student.mobileNo) {
    return <p className="text-center p-10 text-red-600">Student not found. Please check login.</p>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-6">
          <FaUserCircle className="text-8xl text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold">{student.firstName} {student.lastName}</h1>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            ['Roll No', student.rollNo],
            ['PRN', student.prn],
            ['Mobile', student.mobileNo],
            ['DOB', student.dob],
            ['Dept', student.department],
            ['Division', student.division],
            ['Gender', student.gender],
            ['Address', student.address],
          ].map(([label, val]) => (
            <div key={label} className="bg-blue-50 p-4 rounded border">
              <p className="text-sm text-gray-500">{label}</p>
              <p className="font-semibold text-gray-800">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
