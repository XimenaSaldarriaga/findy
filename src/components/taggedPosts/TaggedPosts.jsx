import React, { useEffect, useState } from 'react';
import { URL_POSTS } from '../../services/data';
import axios from 'axios';

const TaggedPosts = ({  userData, goToPostUser, isYouTubeLink, getVideoIdFromUrl }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (userData) { 
          setUserId(userData.id);
  
          
          const responsePosts = await axios.get(URL_POSTS);
          const posts = responsePosts.data;
  
          const taggedPosts = posts.filter(post => post.tag === userData.id);
          setUserPosts(taggedPosts);
        }
      } catch (error) {
        console.error('Error fetching tagged posts:', error);
      }
    };
  
    fetchUserPosts();
  }, [userData]);

  return (
    <div className="profile__tag">
      {userPosts.map((post) => (
        <div
          key={post.id}
          className="profile__divTag"
          onClick={() => goToPostUser(post.id)}
        >
          {isYouTubeLink(post.content) ? (
            <iframe
              className="profile__videoTag"
              title={post.caption}
              src={`https://www.youtube.com/embed/${getVideoIdFromUrl(
                post.content
              )}`}
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <img
              className="profile__photoTag"
              src={post.content}
              alt={post.caption}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TaggedPosts;



