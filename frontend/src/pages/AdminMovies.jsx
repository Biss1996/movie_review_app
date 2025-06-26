import React, { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const AdminMovies = () => {
  const { movies, deleteMovie, editMovie, setOnchange, onChange } = useContext(MovieContext);
  const { currentUser } = useContext(UserContext);

  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", tags: "" });

  if (!currentUser || !currentUser.is_admin) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        Unauthorized. Admin access only.
      </div>
    );
  }

  const startEdit = (movie) => {
    setEditId(movie.id);
    setForm({ title: movie.title, description: movie.description, tags: movie.tags });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (id) => {
  editMovie(id, form).then((data) => {
    if (data.success) {
      toast.success("Movie updated successfully!");
      setEditId(null);
      setOnchange(!onChange); // refresh movie list
    } else {
      toast.error(data.error || "Failed to update movie");
    }
  }).catch(() => {
    toast.error("Server error while updating movie");
  });
};


  return (
  <div className="relative pt-4 pb-3 bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 w-full min-h-screen pt-0 pb-0">

    <div className="max-w-3xl mx-auto my-8 p-6 bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 rounded-lg shadow-lg">
       <h2 className="text-2xl text-white font-bold mb-6 text-center">Manage Movies</h2>

      {movies.length === 0 ? (
        <p className="text-gray-500 text-center">No movies found.</p>
      ) : (
        <ul className="space-y-6">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="p-4 border rounded-md shadow-sm bg-white"
            >
              {editId === movie.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border px-2 py-1 rounded"
                  />
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border px-2 py-1 rounded"
                  ></textarea>
                  <input
                    type="text"
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="Tags"
                    className="w-full border px-2 py-1 rounded"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdate(movie.id)}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-600">{movie.description}</p>
                    <p className="text-sm mt-1 text-gray-500">Tags: {movie.tags}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => startEdit(movie)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default AdminMovies;
