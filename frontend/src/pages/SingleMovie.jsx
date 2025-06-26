import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { UserContext } from '../context/UserContext';
import { api_url } from "../config.json";
import { toast } from 'react-toastify';

const SingleMovie = () => {
  const { mov_id } = useParams();
  const { currentUser, auth_token } = useContext(UserContext);
  const {
    add_review,
    update_review,
    delete_review,
    handleRating
  } = useContext(MovieContext);

  const [movie, setMovie] = useState({});
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [onChange, setOnchange] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingBody, setEditingBody] = useState("");

  useEffect(() => {
    fetch(`${api_url}/movies/${mov_id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      });
  }, [mov_id, onChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await add_review(mov_id, body);
    await handleRating(mov_id, rating);
    setBody("");
    setRating(0);
    setOnchange(prev => !prev);
  };

  const handleUpdateReview = async (reviewId) => {
    await update_review(reviewId, editingBody);
    setEditingReviewId(null);
    setEditingBody("");
    setOnchange(prev => !prev);
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Delete this review?")) {
      await delete_review(reviewId);
      setOnchange(prev => !prev);
    }
  };
  // admin can approve reviews
  const handleApproveReview = async (reviewId) => {
    try {
      const res = await fetch(`${api_url}/reviews/${reviewId}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify({ is_approved: true }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Review approved!");
        setOnchange(prev => !prev); // refresh movie list to show updated status
      } else {
        toast.error(data.error || "Approval failed");
      }
    } catch (error) {
      toast.error("Server error while approving review");
    }
  };


  return (
    <div className="relative pt-4 pb-3 bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 w-full min-h-screen pt-0 pb-0">

       <div className="max-w-3xl mx-auto my-8 p-6 bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 rounded-lg shadow-lg">
      <div>
        <h2 className="text-3xl text-center text-white font-bold">{movie.title}</h2>
          <p className="text-white">{movie.description}</p>

        <div className="mt-4 sm:w-[40vw]">
          <h3 className="text-2xl text-white text-center font-semibold">Reviews</h3>
          {movie && movie.reviews && movie.reviews.length > 0 ? (
            <ul>
              {movie.reviews
                .filter(review => currentUser?.is_admin || review.is_approved)
                .map((review) => (
                  <li key={review.id} className="bg-gray-100 text-blue-700 p-0 my-2 rounded">
                    {/*  user can edit own review */}
                    {review.user.username === currentUser?.username ? (
                      editingReviewId === review.id ? (
                        <>
                        <textarea
                          value={editingBody}
                          onChange={(e) => setEditingBody(e.target.value)}
                          className="w-full p-2 border mt-2"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            className="bg-green-500 text-white px-2 py-1 rounded"
                            onClick={() => handleUpdateReview(review.id)}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-400 text-white px-2 py-1 rounded"
                            onClick={() => setEditingReviewId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="py-4">{review.message}</p>
                        <div className="flex justify-between">
                          <p>{review.user.username}</p>
                          <p>{review.created_at}</p>
                        </div>
                        <div className="flex gap-3 mt-2">
                          <button
                            onClick={() => {
                              setEditingReviewId(review.id);
                              setEditingBody(review.message);
                            }}
                            className="text-blue-600 underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="text-red-600 underline"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      
                      <div className="flex justify-between">
                        <p>{review.user.username}</p>
                        
                        <p className="mt-6 mb-3">{review.message}</p>
                        <p className="text-xs text-gray-500">{review.created_at}</p>

                      </div>
                       {/* Show Approve Button only for admins */}
                        {!review.is_approved && currentUser?.is_admin && (
                          <button
                            onClick={() => handleApproveReview(review.id)}
                            className="mt-2 text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Approve Review
                          </button>
                        )}

                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-sky-600'>This movie has not been reviewed</p>
          )}
          

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <label htmlFor="rating" className="block font-medium text-white">
                Your Rating (1 to 5)
              </label>
              <input
                type="number"
                id="rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            <div>
              <label htmlFor="review" className="block text-white font-medium">
                Write your review here
              </label>
              <textarea
                required
                id="review"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your review"
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
    </div>
  );
};

export default SingleMovie;
