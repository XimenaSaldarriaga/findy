import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../authContext.jsx';
import Home from '../home/Home';
import PostUser from '../postUser/PostUser';
import Profile from '../profile/Profile';
import Login from '../login/Login';
import Footer from '../footer/Footer';
import UpdateUsers from '../updateUser/UpdateUser';

const Router = () => {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home/:id" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/post" element={<PostUser />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    );
  };

  export default Router;


