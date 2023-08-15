import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../home/Home';
import PostUser from '../postUser/PostUser';
import Profile from '../profile/Profile';
import Login from '../login/Login';
import Footer from '../footer/Footer';
import { UserProvider } from '../userContext/UserContext';

const Router = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home/:id" element={<Home />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                    <Route path="/post" element={<PostUser />} />
                </Routes>
                <ShowFooterOnNonLoginPage />
            </BrowserRouter>
        </UserProvider>
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
