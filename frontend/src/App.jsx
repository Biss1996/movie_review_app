import React, { useContext } from 'react';
import {  Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import SingleMovie from './pages/SingleMovie';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Users from './pages/Users';
import AddMovie from './pages/AddMovie';
import AdminMovies from './pages/AdminMovies';
import AdminReviews from './pages/AdminReviews';
import { UserProvider, UserContext } from './context/UserContext';
import { MovieProvider } from './context/MovieContext';

const AdminRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  if (!currentUser?.is_admin) return <Navigate to="/" />;
  return children;
};
function App() {

  return (
    <BrowserRouter>

    <UserProvider>
      <MovieProvider>

        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:mov_id" element={<SingleMovie />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
            <Route path="/admin/addmovie" element={<AdminRoute><AddMovie /></AdminRoute>} />
            <Route path="/admin/movies" element={<AdminRoute><AdminMovies /></AdminRoute>} />
            <Route path="/admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />


            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      
      </MovieProvider>
    </UserProvider>

    </BrowserRouter>
  );
}

export default App;
