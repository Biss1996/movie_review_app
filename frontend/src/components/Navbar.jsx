import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <NavLink to="/" className="text-2xl font-bold hover:text-blue-300">
          UltimateMovies
        </NavLink>
        <ul className="flex space-x-6 text-sm">
          <li>
            <NavLink to="/" className="hover:text-blue-300">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies" className="hover:text-blue-300">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/register" className="hover:text-blue-300">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login" className="hover:text-blue-300">Login</NavLink>
          </li>
          <li>
            <NavLink to="/addmovie" className="hover:text-blue-300">New Movie</NavLink>
          </li>
        </ul>
        <div>
          <NavLink to="/profile" className="text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">
            Profile
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
