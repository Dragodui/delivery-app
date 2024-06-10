import React, { useState } from 'react';
import Button from '../components/UI/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { baseUrl } from '../config';
import Input from '../components/UI/Input';
import Wrapper from '../components/UI/Wrapper';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [resInfo, setResInfo] = useState({
    resName: '',
    resAddress: '',
    resDescription: '',
    resImage: '',
  });
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    const sendUser =
      resInfo.resName === ''
        ? { email, name, role, password }
        : { email, name, role, password, resInfo };
<<<<<<< HEAD
    try {
      const response = await axios.post(`${baseUrl}/register`, sendUser);
      console.log(response);
      navigate('/login');
    } catch (error) {
      const validationErrors = {};
      error.response.data.errors.forEach((err) => {
        validationErrors[err.path] = err.msg;
      });
      setErrors(validationErrors);
    }
=======
    axios // lib для запросов
      .post(`${baseUrl}/register`, sendUser)
      .then((res) => {
        console.log(res.data);
        navigate('/login');
      })
      .catch((err) => setIsError(true));
>>>>>>> 6c2e15a7435634c5316adc585197a4d7695f6c78
  };

  return (
    <Wrapper>
      <form className='items-center flex flex-col w-full max-w-[400px] gap-4 px-4 py-6 shadow-2xl rounded-xl bg-modalBg font-body'>
        <p className='text-3xl font-bold font-heading'>Register</p>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({});
          }}
          value={email}
          placeholder='Email'
          type='text'
        />
        {errors.email && <p className='text-left w-full text-red-500'>{errors.email}</p>}
        <Input
          onChange={(e) => {
            setName(e.target.value);
            setErrors({});
          }}
          value={name}
          placeholder='Your name'
          type='text'
        />
        {errors.name && <p className='text-left text-red-500 w-full'>{errors.name}</p>}
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({});
          }}
          value={password}
          placeholder='Password'
          type={isPasswordShown ? 'text' : 'password'}
        />
        {errors.password && <p className='text-left text-red-500 w-full'>{errors.password}</p>}
        <div>
          <button
            className={`flex rounded-full py-1 px-2 border-2 border-black items-center gap-1 ${
              isPasswordShown ? 'bg-black text-white' : 'bg-white text-black'
            }`}
            onClick={(e) => {
              setIsPasswordShown(!isPasswordShown);
              e.preventDefault();
            }}
          >
            <p className='relative top-[-2px]'>show password</p>
            <FaEye />
          </button>
        </div>
        <div>
          <p className='text-xl text-center font-bold mb-2'>You are:</p>
          <div className='flex gap-4'>
            <div className='flex items-center justify-center gap-1'>
              <Input
                onChange={(e) => setRole(e.target.value)}
                value='user'
                name='uniqueGroup'
                id='user'
                type='radio'
                className='w-[20px]'
              />
              <label className='text-lg top-[-2px] relative' htmlFor='user'>
                user
              </label>
            </div>
            <div className='flex items-center justify-center gap-1'>
              <Input
                onChange={(e) => setRole(e.target.value)}
                value='owner'
                name='uniqueGroup'
                id='owner'
                type='radio'
                className='w-[20px]'
              />
              <label className='text-lg top-[-2px] relative' htmlFor='owner'>
                restaurant owner
              </label>
            </div>
          </div>
          
        {errors.role && <p className='text-center w-full text-red-500'>{errors.role}</p>}
        </div>
        {/* {
          role === 'owner'? (
            <OwnerRegistration 
              resInfo={resInfo}
              setResInfo={setResInfo}
            />
          ) : (
            ''
          )
        } */}
        {/* <div className='flex flex-col'>
          {Object.values(errors).map((error, index) => (
            <p key={index} className='text-red-500'>
              {error}
            </p>
          ))}
        </div> */}

        <p>
          Have an account?{' '}
          <Link className='underline' to='/login'>
            log in
          </Link>
        </p>
        <Button
          addStyles={'w-full'}
          type='submit'
          onClick={(e) => fetchRegister(e)}
        >
          Register
        </Button>
      </form>
    </Wrapper>
  );
};

export default Register;
