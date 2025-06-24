import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const Profile = () => {
    const {currentUser, update_user_profile, delete_profile} = useContext(UserContext);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // set initial values for username and email from currentUser
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  // if the user is not logged in, show a message
  if (!currentUser) {
    return <div className="text-center mt-20">Please log in to view your profile.</div>;
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    else{
       update_user_profile(username, email, password, newPassword);
        // setPassword('');
        // setNewPassword('');
        // setConfirmPassword('');
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8">
      <div className="border bg-white rounded-lg shadow-md p-8 w-full sm:w-[50vw]">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
            alt="Profile"
            className="rounded-full w-32 h-32 mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{currentUser && currentUser.username}</h2>
          <p className="text-sm text-gray-600">{currentUser && currentUser.email}</p>
        </div>

        {/* Buttons for Admin/User and Block User */}
        <div className="flex justify-center gap-3 mb-8">
         { currentUser && currentUser.is_admin ?
            <button
              className="bg-blue-500 px-8 py-3 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Admin
            </button>
            :
            <button
              className=" bg-green-500 px-8 py-3 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              User
            </button>
        }
        </div>

        {/* profile update form */}
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Current Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-700 transition duration-300"
          >
            Update Profile
          </button>
        </form>


        <h3 className='text-lg font-semibold text-gray-800 mt-8 mb-4'>DANGER ZONE! Delete Profile</h3>
        <button onClick={delete_profile}
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            DELETE YOUR ACCOUNT
        </button>


      </div>
    </div>
  );
};

export default Profile;
