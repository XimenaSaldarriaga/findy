import React, { useState } from 'react';
import './postForm.scss';
import { URL_POSTS } from '../../services/data';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostForm = ({ onClose, userId }) => {
    const [postData, setPostData] = useState({
        userId: userId,
        content: '',
        caption: '',
        likes: 5,
        likedUsers: [],
        comments: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL_POSTS}`, postData);
            Swal.fire({
                text: 'Post successfully!',
                confirmButtonColor: '#FF7674',
                customClass: {
                    content: 'sweetalert-content',
                    confirmButton: 'sweetalert-confirm-button',
                },
            });

            console.log('Posted:', response.data);
            onClose();
        } catch (error) {
            console.error('Error posting:', error);
        }
    };

    return (
        <div className='postFormOverlay'>
            <div className='postForm'>
                <form className='postForm__form' onSubmit={handlePost}>
                    <div className='postForm__title'>
                        <span> New Post </span>
                    </div>
                    <textarea
                        className="postForm__textarea"
                        name="caption"
                        value={postData.caption}
                        onChange={handleInputChange}
                        placeholder="Share your moments..."
                    ></textarea>
                    <input
                        className="postForm__input"
                        type="url"
                        name="content"
                        value={postData.content} //
                        onChange={handleInputChange}
                        accept="image/*, video/*"
                        placeholder="Share your url"
                    />
                    <button type="submit" className="postForm__button">
                        Post
                    </button>
                </form>
                <div>
                    <button className='postForm__close' onClick={onClose}>
                        <span> X </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
