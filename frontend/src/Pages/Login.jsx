import React, { useEffect, useState } from 'react';
import Button from '../components/UI/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { setIsLoggedIn } from '../store/features/isLoggedInSlice';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { baseUrl } from '../config';

//amogus228@mail.hitler
//kurwaPojebana

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchLogin = () => {
    setIsError(false);
    axios
      .post(`${baseUrl}/login`, { email, password })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        dispatch(setIsLoggedIn({isLoggedIn: true}));
        window.location.reload();
        navigate('/profile');
      })
      .catch((err) => setIsError(true));
  };

  return (
    <main className='flex items-center justify-center w-full px-3'>
      <form className='flex flex-col w-full max-w-[400px] gap-4 px-4 py-6 shadow-2xl rounded-xl mt-[100px]'>
        <p className='text-3xl font-bold'>Log in</p>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
            setIsError(false);
          }}
          value={email}
          className='focus:outline-none py-2 border-b-2 border-b-black'
          placeholder='Email'
          type='text'
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
            setIsError(false);
          }}
          value={password}
          className='focus:outline-none py-2 border-b-2 border-b-black'
          placeholder='Password'
          type={isPasswordShown ? 'text' : 'password'}
        />{' '}
        <div>
          <button
            className={`flex rounded-full py-1 px-2 border-2 border-black items-center gap-1 ${
              isPasswordShown ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          >
            <p className='relative top-[-2px]'>show password</p>
            <FaEye />
          </button>
        </div>
        {isError ? (
          <p className='text-red-600'>Incorrect login or password</p>
        ) : (
          ''
        )}
        <p>
          Don`t have account?{' '}
          <Link className='underline' to='/register'>
            register
          </Link>
        </p>
        <div>
          <Button type='submit' onClick={fetchLogin}>
            Log in
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
