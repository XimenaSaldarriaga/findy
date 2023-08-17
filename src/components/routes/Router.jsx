import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from '../authContext.jsx';
import Home from '../home/Home';
import PostUser from '../postUser/PostUser';
import Profile from '../profile/Profile';
import Login from '../login/Login';
import Footer from '../footer/Footer';

const Router = () => {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home/:id" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/post/:userId" element={<PostUser />} />
          </Routes>
          <ShowFooterOnNonLoginPage />
        </BrowserRouter>
      </AuthProvider>
    );
  };

  const ShowFooterOnNonLoginPage = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    if (isLoginPage) {
        return null; 
    }

    return <Footer />;
};

  export default Router;


