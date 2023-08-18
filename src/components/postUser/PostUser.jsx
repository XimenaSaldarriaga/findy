import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import heart from '../../assets/heart.png';
import comment from '../../assets/comment.png';
import send from '../../assets/send.png';
import like from '../../assets/like.png';
import white from '../../assets/arrow-white.png';
import { likePost, URL_POSTS, URL_USERS, URL_COMMENTS } from '../../services/data'
import './postUser.scss'
import { useAuth } from '../authContext';
import Comments from '../comments/Comments';

const PostUser = () => {
  const { postId } = useParams();
  const postIdNumber = parseInt(postId);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const { state: { userId, isAuthenticated } } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {

        const postResponse = await axios.get(`${URL_POSTS}/${postId}`);
        const postData = postResponse.data;
        setPost(postData);
        console.log(postData);

        const userResponse = await axios.get(`${URL_USERS}/${postData.userId}`);
        const userData = userResponse.data;
        setAuthor(userData);
        console.log(userData);

        if (userId) {
          const userAvatarResponse = await axios.get(`${URL_USERS}/${userId}`);
          setUserAvatar(userAvatarResponse.data.avatar);
        }


      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${URL_COMMENTS}`);
        const responseComments = response.data;
        setComments(responseComments);
        console.log('comments response', responseComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();

    fetchPostDetails();
  }, [postId, userId]);

  if (!post || !author) {
    return <div>Loading...</div>;
  }

  const isYouTubeLink = (url) => url.includes('youtube.com');
  const getVideoIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };
  const goToHome = () => {
    if (userId && isAuthenticated) {
      navigate(`/home/${userId}`);
    }
  };


  const handleLikePost = async (postId) => {
    try {
      await likePost(postId, userId);
      setPost(prevPost => {
        if (prevPost.id === postId) {
          if (prevPost.likedUsers.includes(userId)) {
            prevPost.likes--;
            prevPost.likedUsers = prevPost.likedUsers.filter(likedUserId => likedUserId !== userId);
          } else {
            prevPost.likes++;
            prevPost.likedUsers.push(userId);
          }
        }
        return { ...prevPost };
      });
    } catch (error) {
      console.error('Error liking post:', error);
    }
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
      <img className='post__arrow' src={white} alt="" onClick={goToHome} />
      <div className='post__all'>

        <div className='post__info'>

          <div className='post__user-name'>
            <img className='post__input' src={author.avatar} alt={author.username} />
            <p className='post__name'>{author.username}</p>
          </div>

          <div className='post__quantity'>

            <div className='post__div' onClick={() => handleLikePost(post.id)}>
              {post.likedUsers.includes(userId) ? (
                <img className='post__icons' src={like} alt="Like" />
              ) : (
                <img className='post__icons' src={heart} alt="Heart" />
              )}
              <p>{post.likes} K </p>
            </div>
            <div className='post__div'>
              <img className='post__icons' src={comment} alt="" />
              <p>54 K</p>
            </div>
            <div className='post__div'>
              <img className='post__icons' src={send} alt="" />
              <p>2 K</p>
            </div>

          </div>

        </div>

        <div className='post__paragraph'>
          <p>{post.caption}</p>

        </div>
        <div className='post__userComments'>

          <h2>Comments</h2>
          {console.log('Filtered comments:', comments.filter((comment) => comment.postId === postIdNumber))}
          {postIdNumber &&
            comments &&
            comments
              .filter((comment) => comment.postId === postIdNumber)
              .map((comment) => (
                <Comments key={comment.id} comment={comment} />
              ))}
          <div className='post__comment'>
            {userId && (
              <img className='post__commentUser' src={userAvatar} type="url" />
            )}
            <input
              className='post__commentMessage'
              type="text"
              placeholder='Write comment as username...'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostUser; 