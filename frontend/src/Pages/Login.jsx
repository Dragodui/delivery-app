import React, { useEffect, useState } from 'react';
import Button from '../components/UI/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { setIsLoggedIn } from '../store/features/isLoggedInSlice';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { baseUrl } from '../config';
import Input from '../components/UI/Input';
import Wrapper from '../components/UI/Wrapper';

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
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        window.location.reload();
        navigate('/profile');
      })
      .catch((err) => setIsError(true));
  };

  return (
    <Wrapper>
      <form className='flex flex-col w-full max-w-[400px] items-center gap-4 bg-modalBg px-4 py-6 border-2 border-text rounded-xl mt-[100px] font-body'>
        <p className='text-3xl font-bold font-heading'>Log in</p>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
            setIsError(false);
          }}
          value={email}
          placeholder='Email'
          type='text'
        />
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
            setIsError(false);
          }}
          value={password}
          placeholder='Password'
          type={isPasswordShown ? 'text' : 'password'}
        />{' '}
        <div>
          <button
            className={`flex rounded-full py-1 px-2 border-text border-2 items-center gap-1 ${
              isPasswordShown ? 'bg-black text-white ' : 'bg-primary text-textWhite'
            }`}
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          >
            <p>show password</p>
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
          <Button type='submit' addStyles={'w-full'} onClick={fetchLogin}>
            Log in
          </Button>
      </form>
    </Wrapper>
  );
};

export default Login;
