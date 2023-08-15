import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import PostUser from '../postUser/Postuser';
import Profile from '../profile/Profile';
import Login from '../login/Login';
import Footer from '../footer/Footer'
import { UserProvider } from '../userContext/UserContext';

const Router = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home/:id" element={<Home />} />
                    {/* <Route path="/profile" element={<Profile />} /> */}
                    <Route path="/profile/:userId" element={<Profile />} />
                    <Route path="/post" element={<PostUser />} />
                </Routes>
                <Footer />

            </BrowserRouter>
        </UserProvider>
    );
};

export default Router;
