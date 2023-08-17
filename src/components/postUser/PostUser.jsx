import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import heart from '../../assets/heart.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';
import white from '../../assets/arrow-white.png';
import { URL_POSTS, URL_USERS } from '../../services/data'
import './postUser.scss'

const PostUser = () => {
  const { postId } = useParams(); 
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
 
        const postResponse = await axios.get(`${URL_POSTS}/${postId}`);
        const postData = postResponse.data;
        setPost(postData);

        console.log(postData);

       
        const userResponse = await axios.get(`${URL_USERS}/${postData.userId}`);
        const userData = userResponse.data;
        setUser(userData);

        console.log(userData);

      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (!post || !user) {
    return <div>Loading...</div>;
  }

  const isYouTubeLink = (url) => url.includes('youtube.com');
  const getVideoIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };


  return (
        <div className='post'>
          {isYouTubeLink(post.content) ? (
        <div className='post__videoContainer'>
          <iframe
            className='post__video'
            title={post.caption}
            src={`https://www.youtube.com/embed/${getVideoIdFromUrl(post.content)}`}
            frameBorder='0'
            allowFullScreen
          />
        </div>
      ) : (
        <img className='post__image' src={post.content} alt={post.caption} />
      )}
      <Link to={`/home/${user.id}`}>
        <img className='post__arrow' src={white} alt="" />
      </Link>
          <div className='post__all'>
    
            <div className='post__info'>
    
              <div className='post__user-name'>
              <img className='post__input' src={user.avatar} alt={user.username} />
            <p className='post__name'>{user.username}</p>
              </div>
    
              <div className='post__quantity'>
    
              <div className='post__div'>
                <img className='post__icons' src={heart} alt="" />
                <p>{post.likes}K </p>
              </div>
              <div className='post__div'>
                <img className='post__icons' src={comment} alt="" />
                <p>54K</p>
              </div>
              <div className='post__div'>
                <img className='post__icons' src={send} alt="" />
                <p>2K</p>
              </div>
    
              </div>
    
            </div>
    
            <div className='post__paragraph'>
            <p>{post.caption}</p>
            </div>
    
            <div className='post__comment'>
              <input className='post__commentUser' type="url" />
              <input className='post__commentMessage' type="text" placeholder='Write comment as username...' />
            </div>
    
          </div>
    
    
    
        </div>
      )
    }
    
    
    export default PostUser; 