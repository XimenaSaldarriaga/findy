import React, { useEffect, useState } from 'react'
import { fetchUserData } from '../../services/data';
import './comments.scss'

const Comments = ({ comment }) => {
    console.log('Comment prop:', comment);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await fetchUserData(comment.userId);
            setUser(userData);
        };

        fetchUser();
    }, [comment.userId]);

    return (
        <div className='comment'>
            {user && (
                <>
                    <div className='comment__user'>
                        <img src={user.avatar} alt={`${user.username} Avatar`} />
                        <span>{user.username} </span>
                    </div>

                </>
            )}
            <div className='comment__text'>
                <p>{comment.text}</p>
            </div>
        </div>
    );
};

export default Comments;