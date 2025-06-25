import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { currentUser, logout_user } = useContext(UserContext);

  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <NavLink to="/" className="text-2xl font-bold hover:text-blue-300">
          UltimateMovies
        </NavLink>
        <ul className="flex space-x-6 text-sm items-center">
          <li>
            <NavLink to="/" className="hover:text-blue-300">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies" className="hover:text-blue-300">Movies</NavLink>
          </li>

          {currentUser?.is_admin && (
            <>
              {/* <li><NavLink to="/admin" className="hover:text-blue-300">Dashboard</NavLink></li> */}
              <li><NavLink to="/admin/movies" className="hover:text-blue-300">Manage Movies</NavLink></li>
              <li><NavLink to="/admin/reviews" className="hover:text-blue-300">Manage Reviews</NavLink></li>
              <li><NavLink to="/admin/users" className="hover:text-blue-300">Manage Users</NavLink></li>
              <li><NavLink to="/admin/addmovie" className="hover:text-blue-300">Add Movie</NavLink></li>

            </>
          )}

          {currentUser ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-blue-300">Profile</Link>
              </li>
              <li>
                <button className="bg-slate-600 px-3 py-1 rounded-full">
                  {currentUser.username}
                </button>
              </li>
              <li>
                <button onClick={logout_user} className="hover:text-blue-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className="hover:text-blue-300">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register" className="hover:text-blue-300">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
