import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { MovieContext } from '../context/MovieContext';
import { toast } from 'react-toastify';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

    const { add_movie } = useContext(MovieContext);
// admins add new movie
const { currentUser } = useContext(UserContext);

if (!currentUser || !currentUser.is_admin) {
  return <div className="text-center mt-20">Please login to add a movie / Unauthorized.</div>;
}


  const handleSubmit = (e) => {
    e.preventDefault();
    
     
    if(body.length < 20){
      toast.error("Movie body must be at least 20 characters long.");
      return;
    }
    if(title.length < 5){
      toast.error("Movie title must be at least 5 characters long.");
      return;
    }
    else{
         // add the movie using the context function
        add_movie(title, body, tags);
        setTitle('');
        setBody('');
        setTags('');
    }
 



 
  };

  return (
    <div className="relative pt-4 pb-3 bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 w-full min-h-screen pt-0 pb-0">

    <div className="max-w-3xl mx-auto my-8 p-6 bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 rounded-lg shadow-lg">
      <h2 className="text-2xl text-center font-semibold text-white mb-4">Add a New Movie</h2>
  
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-white font-medium">Title</label>
          <input required
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title of your movie"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-white font-medium">Body</label>
          <textarea required
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the details of your movie"
            rows="5"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-white font-medium">Tags</label>
          <input required
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tags separated by commas (e.g., Horror, Action, Documentary)"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 rounded-md hover:bg-sky-600 transition"
          >
            Submit Movie
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddMovie;







