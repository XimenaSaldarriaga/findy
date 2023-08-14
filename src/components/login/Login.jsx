import React from 'react';
import { useForm } from 'react-hook-form';
import './Login.scss';
import logo from '../../assets/logo.png';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { URL_USERS } from '../../services/data';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(URL_USERS);
      const users = response.data; 

      const user = users.find(user => user.email === data.email && user.password === data.password);

      if (user) {
        Swal.fire('¡Bienvenido!', '', 'success'); 
      } else {
        Swal.fire('Los datos ingresados son incorrectos', '', 'error'); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="login">
      <div className="login__form">

        <img className='login__logo' src={logo} alt="" />

        <form className='login__formInfo' onSubmit={handleSubmit(onSubmit)}>
          <div className='login__askInfo'>
            <input
              className='login__input'
              placeholder='Email'
              type="email"
              id="email"
              {...register('email', { required: true })}
            />
            {errors.email && <p className='login__errors'>Este campo es requerido.</p>}
          </div>
          <div className='login__askInfo'>
            <input
              className='login__input'
              placeholder='Password'
              type="password"
              id="password"
              {...register('password', { required: true })}
            />
            {errors.password && <p className='login__errors'>Este campo es requerido.</p>}
          </div>

          <div className='login__remember'>
            <input
              type="checkbox"
              className='login__checkbox'
              id="remember"
              {...register('remember')}
            />
            <label className='login__rememberme' htmlFor="remember">Remember me</label>
          </div>

          <div className='login__buttonDiv'>
            <button className='login__button' type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

