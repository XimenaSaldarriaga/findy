import React, { useEffect, useState } from 'react';
import './profile.scss';
import { useAuth } from '../authContext';
import { fetchPostData, fetchUserData } from '../../services/data';
import dots from '../../assets/dots.png';
import arrow from '../../assets/arrow.png';
import edit from '../../assets/edit.png';
import logout from '../../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import UpdateUsers from '../updateUser/UpdateUser';
import FollowersList from '../followersList/FollowersList';


const Profile = () => {
  const { state, dispatch } = useAuth();
  const userId = state.userId || localStorage.getItem('userId');
  const [currentUser, setCurrentUser] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [displayMode, setDisplayMode] = useState('photos');
  const [showFollowersList, setShowFollowersList] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);

  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const goToPostUser = (postId) => {
    navigate(`/post/${postId}`);
  }


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
    localStorage.removeItem('authenticated');
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

          {showSidebar && !showUpdateForm && (
            <div className='profile__sidebar'>
              <button onClick={toggleUpdateForm}> <img className='profile__icons' src={edit} alt="" />Edit Profile</button>
              <button onClick={handleLogout}> <img className='profile__icons' src={logout} alt="" />Logout</button>
            </div>
          )}
          <img className='profile__arrow' src={arrow} alt="" onClick={goToHome} />
          <div className='profile__info'>
            <div className='profile__likes'>
              <div className='profile__option'>
                <p className='profile__subtitle' onClick={() => setShowFollowersList(true)}> {currentUser.followers.length} M </p>
                <p>Followers</p>
              </div>
              <img className='profile__input' src={currentUser.avatar} alt={currentUser.username} />
              <div className='profile__option'>
                <p className='profile__subtitle'>
                  {userPost
                    .filter(post => post.userId === currentUser.id)
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
              <li
                onClick={() => {
                  setDisplayMode('photos');
                  setActiveIndex(0);
                }}
                className={activeIndex === 0 ? 'active' : ''}
              >
                Photos
              </li>
              <li
                onClick={() => {
                  setDisplayMode('videos');
                  setActiveIndex(1);
                }}
                className={activeIndex === 1 ? 'active' : ''}
              >
                Videos
              </li>
              <li
                onClick={() => {
                  setDisplayMode('album');
                  setActiveIndex(2);
                }}
                className={activeIndex === 2 ? 'active' : ''}
              >
                Album
              </li>
              <li
                onClick={() => {
                  setActiveIndex(3);
                }}
                className={activeIndex === 3 ? 'active' : ''}
              >
                Tag
              </li>
            </ul>
            <div className='profile__photos'>
              <div className='profile__photodiv'>
                {displayMode === 'photos' &&
                  userPost
                    .filter(post => !isYouTubeLink(post.content))
                    .map(post => (
                      <img className='profile__photo' src={post.content} alt={post.caption} key={post.id} onClick={() => goToPostUser(post.id)} />
                    ))}
                <div className='profile__videoContainer'>
                  {displayMode === 'videos' &&
                    userPost
                      .filter(post => isYouTubeLink(post.content))
                      .map(post => (
                        <div
                          key={post.id}
                          className='profile__videos'
                          onClick={() => goToPostUser(post.id)}
                        >
                          <iframe
                            className='profile__video'
                            title={post.caption}
                            src={`https://www.youtube.com/embed/${getVideoIdFromUrl(post.content)}`}
                            frameBorder='0'
                            allowFullScreen
                          />
                        </div>
                      ))}
                </div>
              </div>
              <div className='profile__album' >
                {displayMode === 'album' &&
                  userPost.map(post => (
                    <div key={post.id} className='profile__divAlbum' onClick={() => goToPostUser(post.id)}>
                      {isYouTubeLink(post.content) ? (
                        <iframe
                          className='profile__videoAlbum'
                          title={post.caption}
                          src={`https://www.youtube.com/embed/${getVideoIdFromUrl(post.content)}`}
                          frameBorder='0'
                          allowFullScreen
                        />
                      ) : (
                        <img className='profile__photoAlbum' src={post.content} alt={post.caption} />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {showUpdateForm && <UpdateUsers onClose={closeUpdateForm} />}
          {showFollowersList && (
        <FollowersList
          followers={currentUser.followers}
          onClose={() => setShowFollowersList(false)} 
        />
      )}
        </div>
      )}
    </>
  );
};

export default Profile;
