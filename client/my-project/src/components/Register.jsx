import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';// Import useHistory for redirection

const Register = () => {
  const navigate = useNavigate(); // Initialize history hook for redirection

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    designation: '',
    password: '',
    confirmPassword: '',
    profilePic: null,
  });

  const { name, email, phone, address, designation, password, confirmPassword, profilePic } = formData;

  const handleChange = (e) => {
    if (e.target.name === 'profilePic') {
      setFormData({ ...formData, profilePic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('profilePic', profilePic);
    formDataUpload.append('name', name);
    formDataUpload.append('email', email);
    formDataUpload.append('phone', phone);
    formDataUpload.append('address', address);
    formDataUpload.append('designation', designation);
    formDataUpload.append('password', password);

    try {
      const res = await axios.post('http://localhost:5000/register', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res.data); // Handle success response
      alert('Registration successful!');
      // Redirect to login page
      navigate('/login'); // Redirect to /login route after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
      // Handle error response
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className="form-input w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="form-input w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="form-input w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleChange}
              className="form-input w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="designation" className="block text-gray-700 mb-1">
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={designation}
              onChange={handleChange}
              className="form-input w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-input w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="form-input w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profilePic" className="block text-gray-700 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              className="form-input w-full"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
