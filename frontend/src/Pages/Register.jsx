import React, { useState } from 'react';
import Button from '../components/UI/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { baseUrl } from '../config';
import OwnerRegistration from '../components/UI/OwnerRegistration';

//amogus228@mail.hitler
//kurwaPojebana

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
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const fetchRegister = () => {
    setIsError(false);
    const sendUser =
      resInfo.resName === ''
        ? { email, name, role, password }
        : { email, name, role, password, resInfo };
    axios
      .post(`${baseUrl}/register`, sendUser)
      .then((res) => {
        console.log(res.data);
        navigate('/');
      })
      .catch((err) => setIsError(true));
  };

  return (
    <main className='flex items-center justify-center w-full px-3'>
      <form className='flex flex-col w-full max-w-[400px] gap-4 px-4 py-6 shadow-2xl rounded-xl mt-[100px]'>
        <p className='text-3xl font-bold'>Register</p>
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
            setName(e.target.value);
            setIsError(false);
          }}
          value={name}
          className='focus:outline-none py-2 border-b-2 border-b-black'
          placeholder='Your name'
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
        />
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
          <p className='text-xl font-bold mb-2'>You are:</p>
          <div className='flex gap-4'>
            <div className='flex items-center justify-center gap-2'>
              <input
                onChange={(e) => setRole(e.target.value)}
                value='user'
                name='uniqueGroup'
                id='user'
                type='radio'
              />
              <label className='text-lg top-[-2px] relative' htmlFor='user'>
                user
              </label>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <input
                onChange={(e) => setRole(e.target.value)}
                value='owner'
                name='uniqueGroup'
                id='owner'
                type='radio'
              />
              <label className='text-lg top-[-2px] relative' htmlFor='owner'>
                restaurant owner
              </label>
            </div>
          </div>
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
        {isError ? <p className='text-red-600'>Incorrect values</p> : ''}

        <p>
          Have an account?{' '}
          <Link className='underline' to='/login'>
            log in
          </Link>
        </p>
        <div>
          <Button type='submit' onClick={fetchRegister}>
            Register
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Register;
