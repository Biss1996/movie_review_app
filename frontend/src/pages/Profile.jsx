import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import { MovieContext } from '../context/MovieContext';

const Profile = () => {
    const {currentUser, update_user_profile, delete_profile} = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { movies } = useContext(MovieContext); 
  // user movies reviews and ratings
  const userReviews = [];
  const userRatings = [];

  movies?.forEach((movie) => {
    if (movie.reviews) {
      movie.reviews.forEach((rev) => {
        if (rev.user?.username === currentUser?.username) {
          userReviews.push({
            title: movie.title,
            message: rev.message,
            created_at: rev.created_at,
          });
        }
      });
    }

    if (Array.isArray(movie.ratings)) {
  movie.ratings.forEach((rat) => {
    if (rat.user?.username === currentUser?.username) {
      userRatings.push({ title: movie.title, value: rat.value });
    }
  });
}

});


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
<div className="relative bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-600/30 w-full min-h-screen pt-4 pb-3">

    <div className="max-w-3xl mx-auto my-8 p-6 bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-8">
          <img
            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
            alt="Profile"
            className="rounded-full w-32 h-32 mb-4"
          />
          <h2 className="text-2xl font-semibold text-white">{currentUser && currentUser.username}</h2>
          <p className="text-sm text-white">{currentUser && currentUser.email}</p>
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
            <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Current Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-white">New Password</label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm New Password</label>
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


        <h3 className='text-lg font-semibold text-center text-gray-800 mt-8 mb-4'>DANGER ZONE! Delete Profile</h3>
        <button onClick={delete_profile}
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            DELETE YOUR ACCOUNT
        </button>
         {/* Your Reviews */}
        {userReviews.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Your Reviews</h3>
            <ul className="space-y-4">
              {userReviews.map((rev, i) => (
                <li key={i} className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <p className="font-bold text-gray-900 dark:text-white">{rev.title}</p>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">{rev.message}</p>
                  <p className="text-sm text-gray-500 mt-2">On: {rev.created_at}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Your Ratings */}
        {userRatings.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Your Ratings</h3>
            <ul className="space-y-4">
              {userRatings.map((rate, i) => (
                <li key={i} className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <p className="font-bold text-gray-900 dark:text-white">{rate.title}</p>
                  <p className="text-gray-800 dark:text-gray-200">Rating: {rate.value}/5</p>
                </li>
              ))}
            </ul>
          </div>
        )}



      </div>
    </div>
  );
};

export default Profile;
