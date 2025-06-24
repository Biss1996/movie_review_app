import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <Link to="/" className="text-xl font-semibold hover:text-blue-300">UltimateMovies</Link>
          <ul className="flex flex-wrap mt-4 md:mt-0 space-x-6 text-sm">
            <li>
              <Link to="/about" className="hover:underline">About</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">Terms</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <hr className="border-blue-700 my-4" />
        <p className="text-center text-sm text-blue-300">
          © 2025 <Link to="/" className="hover:underline">UltimateMovies</Link>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
