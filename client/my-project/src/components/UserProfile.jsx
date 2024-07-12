import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${userId}`);
        setUser(res.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error fetching user data
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  // If no token, redirect to login page
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
    navigate('/login');
  };

  // If loading, display loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user not found, display user not found message
  if (!user) {
    return <div>User not found</div>;
  }

  // Display user profile
  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 "
      >
        Logout
      </button>
      <div className="max-w-md mx-auto  shadow-md p-8 my-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <p className="font-semibold">Name:</p>
        <p>{user.name}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Email:</p>
        <p>{user.email}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Phone:</p>
        <p>{user.phone}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Address:</p>
        <p>{user.address}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Designation:</p>
        <p>{user.designation}</p>
      </div>
      {user.profilePic && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Profile Picture</h3>
          <img src={`http://localhost:5000/${user.profilePic}`} alt="Profile" style={{ maxWidth: "50%" }}  />
        </div>
      )}
    </div>
    </div>
  );
};

export default UserProfile;
