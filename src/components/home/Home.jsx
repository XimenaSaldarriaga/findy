import React, { useEffect, useState } from 'react'
import './home.scss'
import logo from '../../assets/logo.png'
import heart from '../../assets/heart.png'
import messages from '../../assets/messages.png'
import comment from '../../assets/comment.png'
import send from '../../assets/send.png'
import save from '../../assets/save.png'
import { updatePostLikes, fetchUserData, URL_POSTS, URL_USERS } from '../../services/data'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Home = () => {

    const userId = localStorage.getItem('userId');
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});
    const [likedPosts, setLikedPosts] = useState([]);
    const navigate = useNavigate();



useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL_POSTS);
      const postData = await response.json();
      const filteredPosts = postData.filter((post) => post.userId !== parseInt(userId));
      setPosts(filteredPosts);

      const usersData = {};
      for (const post of filteredPosts) {
        if (!usersData[post.userId]) {
          const userData = await fetchUserData(post.userId);
          usersData[post.userId] = userData;
        }
      }

      if (usersData[userId]) {
        delete usersData[userId];
      }

      setUsers(usersData);
    };
    fetchData();
  }, [userId]);

  const handleLike = async (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        if (post.liked) {
          return { ...post, liked: false, likes: post.likes - 1 };
        } else {
          return { ...post, liked: true, likes: post.likes + 1 };
        }
      }
      return post;
    });

    setPosts(updatedPosts);

    await updatePostLikes(postId, updatedPosts.find((post) => post.id === postId).likes);
  };


    const handleFollow = async (userIdToFollow, usernameToFollow) => {
        const loggedInUserId = localStorage.getItem('userId');

        try {
            const responsePostUser = await axios.get(`${URL_USERS}/${userIdToFollow}`);
            const postUser = responsePostUser.data;
            const responseLoggedInUser = await axios.get(`${URL_USERS}/${loggedInUserId}`);
            const loggedInUser = responseLoggedInUser.data;
            const isAlreadyFollowing = loggedInUser.following.some(user => user.id === userIdToFollow);

            if (!isAlreadyFollowing) {
                const userToFollow = { id: userIdToFollow, username: usernameToFollow };
                const updatedLoggedInUser = {
                    ...loggedInUser,
                    following: [...loggedInUser.following, userToFollow],
                };

                await axios.patch(`${URL_USERS}/${loggedInUserId}`, updatedLoggedInUser);
                const updatedPostUser = {
                    ...postUser,
                    followers: [...postUser.followers, { id: loggedInUserId, username: loggedInUser.username }],
                };
                await axios.patch(`${URL_USERS}/${userIdToFollow}`, updatedPostUser);

                console.log(`Siguiendo a ${usernameToFollow} (ID: ${userIdToFollow})`);
            } else {
                console.log('Ya sigues a este usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const goToPostUser = (postId) => {
        navigate(`/post/${postId}`);
    }

    return (
        <div className='home'>

            <div className='home__header'>
                <div className='home__images'>
                    <img src={logo} alt="" />
                    <div className='home__vectors'>
                        <img className='home__vector' src={heart} alt="" />
                        <img className='home__vector' src={messages} alt="" />
                    </div>
                </div>

                <div className='home__stories'>
                    <div className='home__myStory home__yourStory'>
                        <div className='home__input'>
                            <input className='home__url home__myImage' type="url" placeholder='+' />
                        </div>
                        <span className='home__span'>Your Story</span>
                    </div>

                    <div className='home__allStories'>
                        {users && Object.values(users).map(user => (
                            <div className='home__yourStory' key={user.id}>
                                <img className='home__url' src={user.story} alt='User Story' />
                                <span className='home__span'>{user.username}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='home__main'>
                {posts.map((post) => (
                    <div key={post.id} className='home__post'>
                        <div className=' home__postHeader'>
                            <div className='home__input'>
                                <img className='home__imgPost' src={users[post.userId]?.avatar} alt='User Avatar' />
                                <span className='home__span'>{users[post.userId]?.username}</span>
                            </div>

                            <button onClick={() => handleFollow(users[post.userId]?.id, users[post.userId]?.username)}>Follow</button>
                        </div>
                        <div className='home__postContainer'
                            onClick={() => goToPostUser(post.id)}
                        >
                            {post.content.includes('youtube') ? (
                                <iframe
                                    className='home__postVideo'
                                    src={post.content}
                                    title='YouTube Video'
                                />
                            ) : (
                                <img className='home__postImagen' src={post.content} alt='' />
                            )}
                        </div>
                        <div> <div className='home__postOptions'>
                            <div className='home__options'>

                                <div
                                    className={`home__option ${likedPosts.includes(post.id) ? 'liked' : ''}`}
                                    onClick={() => handleLike(post.id)}
                                >
                                    <img src={heart} alt='' />
                                    <p>{post.likes}</p>
                                </div>
                                <div className='home__option'>
                                    <img src={comment} alt="" />
                                    <p>87K</p>
                                </div>
                                <div className='home__option'>
                                    <img src={send} alt="" />
                                    <p>10K</p>
                                </div>
                            </div>

                            <div><img src={save} alt="" /></div>
                        </div>

                            <div>
                                <p className='home__footerPost'> <span className='home__namePost'>{users[post.userId]?.username}</span> {post.caption}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Home;









