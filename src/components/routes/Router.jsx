import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import PostUser from '../postUser/Postuser';
import Profile from '../profile/Profile';
import Login from '../login/Login';
import Footer from '../footer/Footer'
import UpdateUsers from '../updateUser/UpdateUser';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home/:id" element={<Home />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/post" element={<PostUser />} />
                    <Route path="/update/:id" element={<UpdateUsers />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
};

export default Router;
