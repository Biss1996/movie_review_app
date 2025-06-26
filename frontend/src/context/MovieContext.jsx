import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {api_url} from "../config.json"

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => 
{
    const navigate = useNavigate();

      const {auth_token} = useContext(UserContext);
      const [onChange, setOnchange] = useState(false);

    const [movies, setMovies] = useState([]);

    // =====  to add a new movie ======
    function add_movie(title, description, tags){
        toast.loading("Adding your movie...");
        fetch(`${api_url}/movies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth_token}`
                },
                body: JSON.stringify({title, description, tags})
            }
        )
        .then(response => response.json())
        .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error);
            }
            else if(res.success){
                toast.dismiss();
                toast.success(res.success);
                navigate("/movies");
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while adding the movie.");
            }
        })
    }

// Update a Review by user

const update_review = async (review_id, message) => {
  await fetch(`${api_url}/reviews/${review_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({ message }),
  });
};

// delete review by user
const delete_review = async (review_id) => {
  await fetch(`${api_url}/reviews/${review_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  });
};

// delete movie by admin
const deleteMovie = (id) => {
  fetch(`${api_url}/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        toast.success(data.success);
        setOnchange(!onChange); // trigger re-fetch
      } else {
        toast.error(data.error || "Delete failed");
      }
    })
    .catch(() => toast.error("Server error deleting movie"));
};



    // fetch all movies from the API

useEffect(() => {
  fetch(`${api_url}/movies`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setMovies(data);
      } else {
        setMovies([]);
        console.error("Invalid data:", data);
        toast.error("Failed to load movies.");
      }
    })
    .catch(err => {
      setMovies([]);
      console.error("Error fetching movies:", err);
      toast.error("Unable to fetch movies from server.");
    });
}, [onChange]);

// edit movie by admin

const editMovie = (id, updatedData) => {
  return fetch(`${api_url}/movies/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify(updatedData),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        toast.success("Movie updated successfully!");
        setOnchange(!onChange); // refresh list
      } else {
        toast.error(data.error || "Failed to update movie.");
      }
      return data;
    })
    .catch(() => toast.error("Server error while updating movie"));
};

    const handleRating = (movie_id, value) => {
  fetch(`${api_url}/movie/rating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({ movie_id, value }), // `value`  rating: 1–5
  })
    .then((response) => response.json())
    .then((res) => {
      toast.dismiss();

      if (res.error) {
        toast.error(res.error);
      } else if (res.success) {
        setOnchange(!onChange); // re-fetch or update movies
        toast.success(res.success);
      } else {
        toast.error("Unexpected response from server.");
      }
    })
    .catch((error) => {
      toast.dismiss();
      toast.error("An error occurred while rating.");
      console.error("Rating error:", error);
    });
};


                
    // =====  to add a new review ======
    function add_review(movie_id, message){
        toast.loading("Adding your review...");
        fetch(`${api_url}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth_token}`
                },
                body: JSON.stringify({movie_id, message})
            }
        )
        .then(response => response.json())
        .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error);
            }
            else if(res.success){
                toast.dismiss();
                toast.success(res.success);
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while adding the review.");
            }
        })
    }

 





    const context_data = {
  movies,
  onChange,
  setOnchange,
  add_movie,
  deleteMovie,
  handleRating,
  add_review,
  update_review,
  delete_review,
  editMovie
};


    return(
        <MovieContext.Provider value={context_data}>
            {children}
        </MovieContext.Provider>
    )

};