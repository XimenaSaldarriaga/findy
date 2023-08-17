import React, { useEffect, useState } from 'react'
import './home.scss'
import logo from '../../assets/logo.png'
import heart from '../../assets/heart.png'
import messages from '../../assets/messages.png'
import comment from '../../assets/comment.png'
import send from '../../assets/send.png'
import save from '../../assets/save.png'
import { fetchUserData, URL_POSTS } from '../../services/data'


const Home = () => {

    const userId = localStorage.getItem('userId');
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL_POSTS);
            const postData = await response.json();
            const filteredPosts = postData.filter(post => post.userId !== parseInt(userId));
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
                            </div>
                            <span className='home__span'>{users[post.userId]?.username}</span>
                        </div>

                        {post.content.includes('youtube') ? (
                            <iframe
                                className='home__postImagen'
                                src={post.content}
                                title='YouTube Video'
                            />
                        ) : (
                            <img className='home__postImagen' src={post.content} alt='' />
                        )}
                        <div>


                            <div className='home__postOptions'>
                                <div className='home__options'>
                                    <div className='home__option'>
                                        <img src={heart} alt="" />
                                        <p>300K</p>
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
                                <p className='home__footerPost'> <span className='home__namePost'>Neis Rosado</span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam consectetur maiores aperiam cumque eum voluptatibus dignissimos accusantium natus aspernatur veritatis, quia harum sunt sint blanditiis ipsa autem molestias quae culpa.</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Home









