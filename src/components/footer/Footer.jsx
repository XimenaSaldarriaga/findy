import React, { useState } from 'react'
import './footer.scss'
import home from '../../assets/home.png'
import bell from '../../assets/bell.png'
import search from '../../assets/search.png'
import add from '../../assets/add.png'
import PostForm from '../postForm/PostForm'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../userContext/UserContext'

const Footer = () => {
    const { userId } = useUser();
    const [showPostForm, setShowPostForm] = useState(false);
    const navigate = useNavigate();
    const togglePostForm = () => {
        console.log('click in post');
        setShowPostForm(!showPostForm);
    }
    const closePostForm = () => {
        setShowPostForm(false);
    }
    const goToProfile = () => {
        if (userId) {
            navigate(`/profile/${userId}`);
        }
    };
    
    const goToHome = () => {
        if (userId) {
            navigate(`/home/${userId}`);
        }
    };
    
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
                <button className='footer__user' onClick={() => goToProfile(userId)}></button>
            </div>
            {showPostForm && <PostForm onClose={closePostForm} />}
        </div>
    )
}

export default Footer