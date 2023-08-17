import React, { useEffect, useState } from 'react';
import './footer.scss';
import home from '../../assets/home.png';
import bell from '../../assets/bell.png';
import search from '../../assets/search.png';
import add from '../../assets/add.png';
import PostForm from '../postForm/PostForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';
import { fetchUserData } from '../../services/data';

const Footer = () => {
    const { state } = useAuth();
    const { userId, isAuthenticated } = state;
    const [showPostForm, setShowPostForm] = useState(false);
    const [userAvatar, setUserAvatar] = useState('');
    const navigate = useNavigate();
  
    const togglePostForm = () => {
      setShowPostForm(!showPostForm);
    };
  
    const closePostForm = () => {
      setShowPostForm(false);
    };
  
    const goToProfile = () => {
      if (userId && isAuthenticated) {
        navigate(`/profile/${userId}`);
      }
    };
  
    const goToHome = () => {
      if (userId && isAuthenticated) {
        navigate(`/home/${userId}`);
      }
    };

    const fetchUserAvatar = async () => {
      try {
          const userData = await fetchUserData(userId); 
          setUserAvatar(userData.avatar); 
      } catch (error) {
          console.error('Error fetching user avatar:', error);
      }
  };
  useEffect(() => {
    if (userId && isAuthenticated) {
        fetchUserAvatar();
    }
}, [userId, isAuthenticated]);

  return (
    <div className='footer'>
      <div className='footer__left'>
        <img src={home} alt="" onClick={goToHome} />
        <img src={search} alt="" />
      </div>
      <div className='footer__center'>
        <img src={add} alt="" onClick={togglePostForm} />
      </div>
      <div className='footer__right'>
        <img src={bell} alt="" />
        <img src={userAvatar} alt="" className='footer__user' onClick={goToProfile} />
      </div>
      {showPostForm && <PostForm onClose={closePostForm} userId={userId} />}
    </div>
  );
};

export default Footer;
