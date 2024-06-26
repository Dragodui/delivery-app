import React, { useState } from 'react';
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
  const [errors, setErrors] = useState({});
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchLogin = async () => {
    setErrors({});
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      const token = response.data.token;
      dispatch(setIsLoggedIn({ isLoggedIn: true }));
      localStorage.setItem('token', token);
      window.location.reload();
      navigate('/profile');
    } catch (error) {
      const validationErrors = {};
      const parsedErrors = error.response.data.errors;
      if (parsedErrors !== undefined) {
        parsedErrors.forEach((err) => {
          validationErrors[err.path] = err.msg;
        });
        console.log(validationErrors);
      } else {
        validationErrors['login'] = 'Invalid login or password';
      }
      setErrors(validationErrors);
    }
  };

  return (
    <Wrapper>
      <form className='flex flex-col w-full max-w-[400px] items-center gap-4 bg-white px-4 py-6 shadow-2xl rounded-xl mt-[100px] font-body'>
        <p className='text-3xl font-bold font-heading'>Log in</p>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({});
          }}
          value={email}
          placeholder='Email'
          type='email'
        />
        {errors.email && (
          <p className='text-left text-error w-full'>{errors.email}</p>
        )}
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors(false);
          }}
          value={password}
          placeholder='Password'
          type={isPasswordShown ? 'text' : 'password'}
        />
        {errors.password && (
          <p className='text-left text-error w-full'>{errors.password}</p>
        )}
        <div>
          <button
            className={`flex rounded-md bg-main py-1 px-2 shadow-2xl items-center gap-1 ${
              isPasswordShown
                // ? 'bg-black text-white '
                // : 'bg-main text-text '
            }`}
            onClick={() => setIsPasswordShown(!isPasswordShown)}
          >
            <p>show password</p>
            <FaEye />
          </button>
        </div>
        <div className='flex flex-col'>
          {errors.length ? errors.map((error) => <p>{error.msg}</p>) : ''}
        </div>
        <p>
          Don`t have account?{' '}
          <Link className='underline' to='/register'>
            register
          </Link>
        </p>
        {errors.login && (
          <p className='text-center text-error w-full'>{errors.login}</p>
        )}
        <Button type='submit' addStyles={'w-full'} onClick={fetchLogin}>
          Log in
        </Button>
      </form>
    </Wrapper>
  );
};

export default Login;
