import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login_user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login_user(email, password);
  };

  return (
<div className="relative pt-4 pb-3 bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 w-full min-h-screen pt-0 pb-0">

    <div className="max-w-3xl mx-auto my-8 p-6 bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 rounded-lg shadow-lg">
    
    <div className="max-w-md mx-auto px-4 py-8 text-white">
      <div className="mb-6 text-center">
        <img src={Logo} alt="Logo" className="mx-auto h-20" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Login to continue</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-md border text-white border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-md border text-white border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-md hover:bg-sky-700 transition"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <Link to="/forgot-password" className="text-sm text-sky-400 hover:underline">
          Forgot Password?
        </Link>
        <p className="text-gray-700 mt-2 text-sm">
          Not a member yet?{' '}
          <Link to="/register" className="text-sky-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </div>
    </div>
  );

};

export default Login;
