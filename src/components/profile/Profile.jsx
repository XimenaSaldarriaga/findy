import React, { useEffect, useState } from 'react';
import './profile.scss';
import { useAuth } from '../authContext';
import { fetchPostData, fetchUserData } from '../../services/data';
import dots from '../../assets/dots.png';
import arrow from '../../assets/arrow.png';
import edit from '../../assets/edit.png';
import logout from '../../assets/logout.png';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const { state, dispatch } = useAuth();
  const userId = state.userId || localStorage.getItem('userId');
  const [currentUser, setCurrentUser] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [displayMode, setDisplayMode] = useState('photos');

  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserData(userId);
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchPost = async () => {
      try {
        const postData = await fetchPostData(userId);
        setUserPost(postData);
        console.log("userPost inside useEffect:", postData);
      } catch (error) {
        console.log('Error obteniendo los post', error);
      }
    };

    fetchUser();
    fetchPost();
  }, [userId]);

  const isYouTubeLink = (url) => url.includes('youtube.com');
  const getVideoIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userId');
    navigate('/');
  };

  const goToHome = () => {
    if (userId) {
      navigate(`/home/${userId}`);
    }
  };


  return (
    <>
      {currentUser && (
        <div className='profile'>
          <img className='profile__image' src={currentUser.banner} alt={currentUser.username} />
          <img className='profile__dots' src={dots} alt="" onClick={() => setShowSidebar(!showSidebar)} />

          {showSidebar && (
            <div className='profile__sidebar'>
              <button > <img className='profile__icons' src={edit} alt="" />Edit Profile</button>
              <button onClick={handleLogout}> <img className='profile__icons' src={logout} alt="" />Logout</button>
            </div>
          )}
          <img className='profile__arrow' src={arrow} alt="" onClick={goToHome} />
          <div className='profile__info'>
            <div className='profile__likes'>
              <div className='profile__option'>
                <p className='profile__subtitle'> {currentUser.followers} M </p>
                <p>Followers</p>
              </div>
              <img className='profile__input' src={currentUser.avatar} alt={currentUser.username} />
              <div className='profile__option'>
                <p className='profile__subtitle'>
                  {userPost
                    .filter(post => post.userId === currentUser.id) // Filtrar los posts por userId
                    .reduce((totalLikes, post) => totalLikes + post.likes, 0)} M
                </p>
                <p>Likes</p>
              </div>
            </div>

            <div className='profile__personal'>
              <p className='profile__subtitle'>{currentUser.name}</p>
              <div className='profile__about'>
                <p>{currentUser.status}</p>
              </div>
            </div>

            <div className='profile__buttons'>
              <button>Follow</button>
              <button>Messages</button>
            </div>
          </div>

          <div className='profile__posts'>
            <ul className='profile__options'>
              <li onClick={() => setDisplayMode('photos')}>Photos</li>
              <li onClick={() => setDisplayMode('videos')}>Videos</li>
              <li onClick={() => setDisplayMode('album')}>Album</li>
              <li>Tag</li>
            </ul>
            <div className='profile__photos'>
              <div className='profile__photodiv'>
                {displayMode === 'photos' &&
                  userPost
                    .filter(post => !isYouTubeLink(post.content))
                    .map(post => (
                      <img className='profile__photo' src={post.content} alt={post.caption} key={post.id} />
                    ))}
                {displayMode === 'videos' &&
                  userPost
                    .filter(post => isYouTubeLink(post.content))
                    .map(post => (
                      <iframe
                        key={post.id} className='profile__video'
                        title={post.caption}
                        src={`https://www.youtube.com/embed/${getVideoIdFromUrl(post.content)}`}
                        frameBorder='0'
                        allowFullScreen
                        
                      />
                      
                    ))}
              </div>
              <div className='profile__album'>
                {displayMode === 'album' &&
                  userPost.map(post => (
                    <div key={post.id} className='profile__photo'>
                      {isYouTubeLink(post.content) ? (
                        <iframe
                          className='profile__video'
                          title={post.caption}
                          src={`https://www.youtube.com/embed/${getVideoIdFromUrl(post.content)}`}
                          frameBorder='0'
                          allowFullScreen
                        />
                      ) : (
                        <img className='profile__photo' src={post.content} alt={post.caption} />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
