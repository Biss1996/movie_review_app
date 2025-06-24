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


    // Approve movie by admin
   function approve_movie(id, is_approved){
        toast.loading("Approve the movie...");
        fetch(`${api_url}/movies/${id}/approve`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth_token}`
                },
                body: JSON.stringify({is_approved})
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
                setOnchange(!onChange)
                toast.success(res.success);
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while approving the movie.");
            }
        })
    }

    


    // fetch all movies from the API
    useEffect(() => {
        fetch(`${api_url}/movies`)
        .then(response => response.json())
        .then(data=>{
            setMovies(data);
            
            console.log("Fetched movies: ", data);
            
        })
    }, [onChange]);


    const handleRating = (movie_id, value) => {
  fetch(`${api_url}/movie/rating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({ movie_id, value }), // `value` is your rating: 1–5
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


    // =========================reviews==================================
                
    // =====  to add a new review ======
    function add_review(movie_id, description){
        toast.loading("Adding your review...");
        fetch(`${api_url}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth_token}`
                },
                body: JSON.stringify({movie_id, description})
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

 





    const context_data={
      movies,
      add_movie,
        handleRating,
        add_review,
        // approve_review
    }

    return(
        <MovieContext.Provider value={context_data}>
            {children}
        </MovieContext.Provider>
    )

};