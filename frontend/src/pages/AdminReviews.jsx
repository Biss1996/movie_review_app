// /pages/AdminReviews.jsx

import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import { UserContext } from "../context/UserContext";
import { api_url } from "../config.json";
import { toast } from "react-toastify";

const AdminReviews = () => {
  const { auth_token, currentUser } = useContext(UserContext);
  const { onChange, setOnchange } = useContext(MovieContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${api_url}/reviews/all`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [onChange]);

  const handleApproval = async (id, isApproved) => {
    try {
      const res = await fetch(`${api_url}/reviews/${id}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify({ is_approved: isApproved }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.success);
        setOnchange((prev) => !prev);
      } else {
        toast.error(data.error || "Action failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await fetch(`${api_url}/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${auth_token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.success);
        setOnchange((prev) => !prev);
      } else {
        toast.error(data.error || "Delete failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage All Reviews</h2>
      {reviews.length < 1 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-4 rounded shadow-sm bg-white">
              <p className="text-sm text-gray-600 mb-2">
                <strong>User:</strong> {review.user?.username} |{" "}
                <strong>Movie ID:</strong> {review.movie_id}
              </p>
              <p className="mb-2">{review.message}</p>
              <div className="flex gap-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleApproval(review.id, true)}
                >
                  Approve
                </button>
                <button
                  className="bg-yellow-600 text-white px-3 py-1 rounded"
                  onClick={() => handleApproval(review.id, false)}
                >
                  Disapprove
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => deleteReview(review.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminReviews;
