import React, { useState } from 'react';
import axios from 'axios';
import { FaRocket } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    rollNo: '', firstName: '', middleName: '', lastName: '',
    email: '', prn: '', dob: '', mobileNo: '', department: '',
    division: '', gender: '', address: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = 'First Name is required.';
    if (!formData.lastName.trim()) tempErrors.lastName = 'Last Name is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Invalid email.';
    if (!formData.rollNo) tempErrors.rollNo = 'Roll No is required.';
    if (!formData.prn) tempErrors.prn = 'PRN is required.';
    if (!/^\d{10}$/.test(formData.mobileNo)) tempErrors.mobileNo = 'Invalid mobile number.';
    if (!formData.department) tempErrors.department = 'Required.';
    if (!formData.division) tempErrors.division = 'Required.';
    if (!formData.gender) tempErrors.gender = 'Required.';
    if (!formData.address.trim()) tempErrors.address = 'Address is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setFormData((prev) => ({
      ...prev,
      [name]: ['firstName', 'middleName', 'lastName'].includes(name) ? capitalize(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccess(false);
    try {
      await axios.post('http://localhost:8080/student', formData);
      setSuccess(true);
      setFormData({
        rollNo: '', firstName: '', middleName: '', lastName: '',
        email: '', prn: '', dob: '', mobileNo: '', department: '',
        division: '', gender: '', address: '',
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-8 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-300">
        
        {/* Form Section */}
        <div className="w-full lg:w-2/3 p-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Student Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['firstName', 'middleName', 'lastName'].map((key) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 capitalize mb-2">
                    {key.replace(/([A-Z])/g, ' $1')}*
                  </label>
                  <input
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    required={key !== 'middleName'}
                    className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  {errors[key] && <p className="text-sm text-red-500 mt-1">{errors[key]}</p>}
                </div>
              ))}
            </div>

            {/* Email, Roll, PRN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'rollNo', label: 'Roll Number' },
                { name: 'prn', label: 'PRN Number' }
              ].map(({ name, label, type = 'text' }) => (
                <div key={name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{label}*</label>
                  <input
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  {errors[name] && <p className="text-sm text-red-500 mt-1">{errors[name]}</p>}
                </div>
              ))}
            </div>

            {/* DOB, Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth*</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number*</label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                {errors.mobileNo && <p className="text-sm text-red-500 mt-1">{errors.mobileNo}</p>}
              </div>
            </div>

            {/* Department / Division */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department*</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select</option>
                  {['CE', 'IT', 'EnTC', 'AIDS', 'ECE'].map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="text-sm text-red-500 mt-1">{errors.department}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Division*</label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select</option>
                  {[...Array(13)].map((_, i) => (
                    <option key={i} value={`FY-${i + 1}`}>{`FY-${i + 1}`}</option>
                  ))}
                </select>
                {errors.division && <p className="text-sm text-red-500 mt-1">{errors.division}</p>}
              </div>
            </div>

            {/* Gender */}
            <fieldset>
              <legend className="block text-sm font-semibold text-gray-700 mb-2">Gender*</legend>
              <div className="flex gap-6">
                {['Male', 'Female', 'Other'].map((g) => (
                  <label key={g} className="flex items-center gap-2 text-gray-700">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="accent-blue-500"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
            </fieldset>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address*</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              />
              {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg transition-all"
              >
                {submitting ? 'Submitting...' : 'Submit Registration'}
              </button>
              {success && <p className="text-green-500 mt-4 text-center">Registration Successful!</p>}
            </div>
          </form>
        </div>

        {/* QR Code Section */}
        <div className="w-full lg:w-1/3 p-10 bg-white/50 backdrop-blur-lg border-l border-gray-300 flex flex-col justify-center items-center text-center">
          <img src="EthiCraft.png" alt="Logo" className="w-24 mb-6 drop-shadow-lg" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h3>
          <p className="mb-4 text-gray-600">Pay ₹500 to complete registration</p>
          <FaRocket className="text-3xl text-yellow-500 mb-4" />
          <div className="bg-white/70 rounded-xl p-4 border border-gray-300">
            <img
              src="/qrcode.jpg"
              alt="QR Code"
              className="w-40 h-40 object-contain mb-2"
            />
            <span className="text-gray-700 font-semibold">Scan to Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
