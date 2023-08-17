import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from '../authContext.jsx';
import Home from '../home/Home';
import PostUser from '../postUser/PostUser';
import Profile from '../profile/Profile';
import Login from '../login/Login';
import Footer from '../footer/Footer';
import PrivateRouter from './PrivateRouter.jsx';


const Router = () => {
  const userAuthentication = JSON.parse(localStorage.getItem("authenticated")) || false;
  const [isAuthenticated, setIsAuthenticated] = useState(userAuthentication);

  useEffect(() => {
    localStorage.setItem("authenticated", isAuthenticated)
  }, [isAuthenticated])
    return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
              <Route element={<PrivateRouter isAutenticate={isAuthenticated} />}>
                <Route path="/home/:id" element={<Home signIn={setIsAuthenticated} login={isAuthenticated} />} />
                <Route path="/profile/:userId" element={<Profile signIn={setIsAuthenticated} login={isAuthenticated} />} />
                <Route path="/post/:userId" element={<PostUser signIn={setIsAuthenticated} login={isAuthenticated} />}   ></Route>
              </Route>
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


