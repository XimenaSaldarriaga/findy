import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './updateUser.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_USERS } from '../../services/data';

const UpdateUsers = ({ onClose }) => {
  const userId = localStorage.getItem('userId');
  const authenticated = localStorage.getItem('authenticated');
  const [userData, setUserData] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${URL_USERS}/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`${URL_USERS}/${userId}`, data);
      
      Swal.fire({
        text: 'Data updated successfully!',
        confirmButtonColor: '#FF7674',
        customClass: {
          content: 'sweetalert-content',
          confirmButton: 'sweetalert-confirm-button',
        },
      });

      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (userData) {
      setValue('username', userData.username);
      setValue('name', userData.name);
      setValue('email', userData.email);
      setValue('password', userData.password);
      setValue('status', userData.status);
      setValue('avatar', userData.avatar);
      setValue('banner', userData.banner);
      setValue('story', userData.story);
      setValue('followers', userData.followers);
      setValue('following', userData.following);
      setValue('posts', userData.posts);
    }
  }, [userData, setValue]);

  return (
    <div className='updateFormOverlay'>
      <div className="updateUsers">
        <div className="updateUsers__title">
          <h2>Update user information</h2>
          <button className='updateUsers__title__close' onClick={onClose}>
            <span> X </span>
          </button>
        </div>
        {userData ? (
          <form className="updateUsers__form" onSubmit={handleSubmit(onSubmit)}>
            <div className='updateUsers__askInfo'>
              <samp className='updateUsers__samp'>Username</samp>
              <input
                className='updateUsers__input'
                placeholder='Username'
                type="text"
                id="username"
                {...register('username', { required: true })}
              />
              {errors.username && <p className='updateUsers__errors'>This field is required.</p>}
            </div>
            <div className='updateUsers__askInfo'>
              <samp className='updateUsers__samp'>Name</samp>
              <input
                className='updateUsers__input'
                placeholder='Name'
                type="text"
                id="name"
                {...register('name', { required: true })}
              />
              {errors.name && <p className='updateUsers__errors'>This field is required.</p>}
            </div>
            <div className='updateUsers__askInfo'>
              <samp className='updateUsers__samp'>Email</samp>
              <input
                className='updateUsers__input'
                placeholder='Email'
                type="text"
                id="email"
                {...register('email', { required: true })}
              />
              {errors.name && <p className='updateUsers__errors'>This field is required.</p>}
            </div>
            <div className='updateUsers__askInfo'>
              <samp className='updateUsers__samp'>Password</samp>
              <input
                className='updateUsers__input'
                placeholder='Password'
                type="password"
                id="password"
                {...register('password', { required: true })}
              />
              {errors.password && <p className='updateUsers__errors'>This field is required.</p>}
            </div>
            <div className='updateUsers__askInfo'>
              <samp className='updateUsers__samp'>Status</samp>
              <input
                className='updateUsers__input'
                placeholder='Status'
                type="text"
                id="status"
                {...register('status', { required: true })}
              />
              {errors.status && <p className='updateUsers__errors'>This field is required.</p>}
            </div>
            <div className='updateUsers__askInfo'>
              <samp className='updateUsers__samp'>Avatar</samp>
              <input
                className='updateUsers__input'
                placeholder='Avatar URL'
                type="text"
                id="avatar"
                {...register('avatar', { required: true })}
              />
              {errors.avatar && <p className='updateUsers__errors'>This field is required.</p>}
            </div>
            <div className='updateUsers__askInfo'>
              <samp className='updateUsers__samp'>Banner</samp>
              <input
                className='updateUsers__input'
                placeholder='Banner URL'
                type="text"
                id="banner"
                {...register('banner', { required: true })}
              />
              {errors.banner && <p className='updateUsers__errors'>This field is required.</p>}
            </div>
            <div className='updateUsers__buttonDiv'>
              <button className='updateUsers__button' type="submit">Actualizar</button>
            </div>
          </form>

        ) : (
          <p>Loading...</p>
        )}

      </div>
    </div>
  );
};

export default UpdateUsers;

