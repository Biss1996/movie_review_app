import React from 'react';
import {  Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import SingleMovie from './pages/SingleMovie';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Users from './pages/Users';
import AddMovie from './pages/AddMovie';
import { UserProvider } from './context/UserContext';
import { MovieProvider } from './context/MovieContext';

function App() {
  return (
    <BrowserRouter>

    <UserProvider>
      <MovieProvider>
        {/* <AnswerProvider> */}
        {/* <VoteProvider> */}

        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:mov_id" element={<SingleMovie />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/addmovie" element={<AddMovie />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
        {/* </VoteProvider> */}
        {/* </AnswerProvider> */}
      </MovieProvider>
    </UserProvider>

    </BrowserRouter>
  );
}

export default App;
