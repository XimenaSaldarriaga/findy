import React, { useState } from 'react';
import './postForm.scss';

const PostForm = ({ onClose }) => {
    const [postData, setPostData] = useState({
        text: '',
        url: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handlePost = (e) => {
        e.preventDefault();
        // hasta el momento la info se muestra en consola luego le haré el post al back
        console.log('Posting:', postData);
          onClose(); 
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
                        name="text"
                        value={postData.text}
                        onChange={handleInputChange}
                        placeholder="Share your moments..."
                    ></textarea>
                    <input
                        className="postForm__input"
                        type="text"
                        name="url"
                        value={postData.url}
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
