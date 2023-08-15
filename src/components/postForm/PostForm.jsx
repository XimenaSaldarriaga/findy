import React from 'react';
import './postForm.scss';

const PostForm = ({ onClose }) => {
    return (
        <div className='postFormOverlay'>

            <div className='postForm'>
                <form className='postForm__form'>
                    <div className='postForm__title'>
                        <span> New Post </span>

                    </div>
                    <textarea
                        className="postForm__textarea"
                        placeholder="Share your moments..."
                    ></textarea>
                    <input className="postForm__input"
                        type="text"
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
