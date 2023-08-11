import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import PostUser from '../postUser/Postuser'
import Profile from '../profile/Profile'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/post" element={<PostUser />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router