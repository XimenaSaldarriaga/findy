import React from 'react'
import './followersList.scss';

const FollowersList = ({ followers, onClose }) => {
    return (
        <div className='followersOverlay'>
            <div className='followers'>
                <h2>Followers</h2>
                <ul>
                    {followers.map(follower => (
                        <li key={follower.id}>{follower.username}</li>
                    ))}
                </ul>
                <button onClick={onClose}>x</button>
            </div>
        </div>
    );
};

export default FollowersList;

