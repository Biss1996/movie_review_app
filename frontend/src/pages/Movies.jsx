import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
// import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { UserContext } from '../context/UserContext';


const Movies = () => {
  const {currentUser} = useContext(UserContext)
  const {movies, handleRating, approve_movie} = useContext(MovieContext);



  return (
<div className="relative bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 w-full min-h-screen pt-0 pb-0">
      <div className="py-4 pt-0 px-4 mx-auto max-w-screen-xl text-center lg:py-16 relative z-10"></div>
    <div>
      <h2 className="text-2xl text-white text-center font-bold mb-4">Movies ({movies && movies.length})</h2>
     {
      movies && movies.length < 1 ?
      <p>No movie at the moment</p>
     :
      <ul>
        {/*everyone can see all movies */}
        {
           movies &&
  movies.map((movie) => (

          <li key={movie.id} className="flex items-center mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            {/* ratings col */}
            <div className="flex flex-col items-center justify-center mr-4 min-w-20">
              {/* <button
                onClick={() => handleRating(movie.id, 1)}
                className="hover:text-gray-700 py-1 px-2 rounded-full mt-2 "
              >
                <IoMdArrowDropupCircle size={40} />
              </button> */}
              {/* <span className="text-lg font-bold">{movie.ratings}</span> */}
              {/* <button
                onClick={() => handleRating(movie.id, -1)}
                className="hover:text-gray-700 py-1 px-2 rounded-full mt-2 "
              >
               <IoMdArrowDropdownCircle size={40} />
              </button> */}
            </div>

            {/* Movie Title and Description */}
            <div>
              <Link to={`/movies/${movie.id}`} className="text-blue-600 hover:underline">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
              </Link>
              <p className="text-gray-600">{movie.body}</p>

                <div className="flex gap-4 items-center mt-2">
    {/* Average Rating */}
    <span className="text-sm text-gray-700">Rating: {movie.average_rating?.toFixed(1) || "N/A"}</span>

    {/* Stars */}
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i < Math.round(movie.average_rating) ? "#facc15" : "none"}
          viewBox="0 0 24 24"
          stroke="#facc15"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927l1.902 3.852 4.25.618-3.076 2.998.726 4.233L12 13.011l-3.851 2.017.726-4.233-3.076-2.998 4.25-.618 1.902-3.852z" />
        </svg>
      ))}
    </div>
  </div>
            </div>
          </li>

        ))}
  


      </ul>
}
    </div>
    /</div>
  );
};

export default Movies;
