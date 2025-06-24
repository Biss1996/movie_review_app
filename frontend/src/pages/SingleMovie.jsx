import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import {api_url} from "../config.json"

const SingleMovie = () => {
  const { mov_id } = useParams();
  const [body, setBody] = useState()

  const [onChange, setOnchange] = useState(false)

  const [movie, setMovie] = useState({})

  const {add_review} = useContext(MovieContext)

  useEffect(()=>{
        fetch(`${api_url}/movies/${mov_id}`)
        .then(response => response.json())
        .then(data=>{
            setMovie(data);
            console.log("mov",data);
            
            
        })

  }, [mov_id, onChange])



  const  handleSubmit = (e) =>{
         e.preventDefault()

         add_review(mov_id, body)
         setOnchange(!onChange)

         setBody("")
  }

  return (
      <div className="relative bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 w-full min-h-screen pt-0 pb-0">

    <div>
      <h2 className="text-3xl font-bold">{movie.title}</h2>
      <p>{movie.description}</p>
      <div className="mt-4 sm:w-[40vw]">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        {
          movie && movie.reviews && movie.reviews.length>0?
          <ul>
            {movie && movie.reviews && movie.reviews.map((review) => (
              <li key={review.id} className="bg-gray-100 p-4 my-2 rounded">
                 <p className='py-4'>{review.body}</p>
                <hr/>
                <div className='flex justify-between'>
                  <p>{review.user.username}</p> <p>{review.created_at}</p>

                </div>
              </li>
            ))}
          </ul>
          :
          <p className='text-sky-600'>This movie has not been reviewed</p>
        }

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">

        <div>
          <label htmlFor="review" className="block text-gray-600 font-medium">Write your review here</label>
          <textarea required
            id="review"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the details of your movie"
            rows="5"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-md hover:bg-sky-600 transition"
          >
            Submit Review
          </button>
        </div>
      </form>

      </div>
    </div>
    </div>
  );
};

export default SingleMovie;
