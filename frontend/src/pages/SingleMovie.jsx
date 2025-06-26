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
          <p className="text-lg text-gray-1000">{movie.description}</p>

        <div className="mt-4 sm:w-[40vw]">
      <h1 className="py-0 text-lg text-center text-white text-2xl font-semibold">Reviews</h1>

      {/* Review Items Container */}
      <div className="flex flex-col items-center gap-3 mt-8">
        {movie && movie.reviews && movie.reviews.length > 0 ? (
          movie.reviews
            .filter(review => currentUser?.is_admin || review.is_approved)
            .map((review) => (
              <div key={review.id} className="flex flex-col gap-4 bg-gray-800 p-4 rounded-md">
                {/* Profile + Rating */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <div className="w-7 h-7 text-sm flex items-center justify-center rounded-full bg-red-500 text-white font-semibold uppercase">
                      {review.user.username[0]}
                    </div>
                    <span>{review.user.username}</span>
                  </div>

                  <div className="flex p-1 gap-1 text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < review.rating ? "#facc15" : "none"}
                        viewBox="0 0 24 24"
                        stroke="#facc15"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927l1.902 3.852 4.25.618-3.076 2.998.726 4.233L12 13.011l-3.851 2.017.726-4.233-3.076-2.998 4.25-.618 1.902-3.852z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Review Content OR Edit Mode */}
                {review.user.username === currentUser?.username && editingReviewId === review.id ? (
                  <>
                    <textarea
                      value={editingBody}
                      onChange={(e) => setEditingBody(e.target.value)}
                      className="w-full p-2 border mt-2 rounded bg-gray-800 text-white"
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
                  <div className="text-white">
                    <p>{review.message}</p>
                  </div>
                )}

                {/* Date + Actions */}
                <div className="flex justify-between text-xs text-gray-300">
                  <span>{new Date(review.created_at).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    {/* Edit/Delete for review owner */}
                    {review.user.username === currentUser?.username && (
                      <>
                        <button
                          onClick={() => {
                            setEditingReviewId(review.id);
                            setEditingBody(review.message);
                          }}
                          className="text-blue-400 underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-red-400 underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {/* Approve button for admin */}
                    {!review.is_approved && currentUser?.is_admin && (
                      <button
                        onClick={() => handleApproveReview(review.id)}
                        className="p-1 px-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Approve
                      </button>
                    )}
                    <button className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60 text-white text-sm">
                      <ion-icon name="share-outline"></ion-icon> Share
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p className="text-sky-400">This movie has not been reviewed</p>
        )}
      </div>

      {/* REVIEW FORM - Hidden for Admin */}
      {!currentUser?.is_admin && (
        <form onSubmit={handleSubmit} className="space-y-6 mt-10">
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
              className="w-full p-2 border rounded mt-1 bg-gray-900 text-white"
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
              className="mt-2 p-3 w-full border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white"
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
      )}
    </div>
    </div>
  </div>
  </div>
);
}
export default SingleMovie;