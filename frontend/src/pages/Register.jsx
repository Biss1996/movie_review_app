import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const { register_user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast.error('Passwords do not match!');
      return;
    } else if (password.length < 4) {
      toast.error('Password must be at least 4 characters long!');
      return;
    } else {
      register_user(username, email, password);
      setUsername('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
    }
  };

  return (
  <div className="relative bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 w-full min-h-screen pt-0 pb-0">

    <div className="max-w-md mx-auto px-4 py-8 text-white">
      <div className="mb-6 text-center">
        <img src={Logo} alt="Logo" className="mx-auto h-20" />
      </div>

      <h2 className="text-white text-2xl font-semibold text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md border text-white border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 bg-transparent text-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="submit"
          className="w-full bg-sky-600 text-white py-3 rounded-md hover:bg-sky-700 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-sky-400 underline">
          Privacy
        </a>{' '}
        and{' '}
        <a href="#" className="text-sky-400 underline">
          Policy
        </a>
        .
      </p>

      <p className="mt-2 text-gray-600 text-sm text-center ">
        Already have an account?{' '}
        <Link to="/login" className="text-sky-400 underline">
          Sign In
        </Link>
      </p>
    </div>
    </div>
  );
};

export default Register;
