import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './updateUser.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_USERS } from '../../services/data';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUsers = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${URL_USERS}/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`${URL_USERS}/${id}`, data);

      Swal.fire({
        text: 'Data updated successfully!',
        confirmButtonColor: '#FF7674',
        customClass: {
          content: 'sweetalert-content',
          confirmButton: 'sweetalert-confirm-button',
        },
      });

      navigate(`/profile/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (userData) {
      setValue('username', userData.username);
      setValue('name', userData.name);
      setValue('password', userData.password);
      setValue('status', userData.status);
      setValue('avatar', userData.avatar);
      setValue('banner', userData.banner);
    }
  }, [userData, setValue]);

  return (
    <div className="updateUsers">
      <h2>Update user information</h2>
      {userData ? (
        <form className="updateUsers__form" onSubmit={handleSubmit(onSubmit)}>
          <div className='updateUsers__askInfo'>
            <samp className='updateUsers__samp'>Username</samp>
            <input
              className='login__input'
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
              className='login__input'
              placeholder='Name'
              type="text"
              id="name"
              {...register('name', { required: true })}
            />
            {errors.name && <p className='updateUsers__errors'>This field is required.</p>}
          </div>
          <div className='updateUsers__askInfo'>
          <samp className='updateUsers__samp'>Password</samp>
            <input
              className='login__input'
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
              className='login__input'
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
              className='login__input'
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
              className='login__input'
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
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default UpdateUsers;

