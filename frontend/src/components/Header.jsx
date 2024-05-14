import React, { useEffect, useState } from 'react';
import Wrapper from './UI/Wrapper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const checkAuth = () => {
      axios
        .get(`${baseUrl}/checkAuth`, { headers: { authorization: token } })
        .then((response) => {
          console.log(response.data);
          const isLoggedInFromResponse = response.data.authenticated;
          setIsLoggedIn(isLoggedInFromResponse);
        })
        .catch((error) => {
          console.log(
            'Error fetching authentication'
          );
        });
    };
    checkAuth();
  }, []);



  const logOut = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    setIsError(false);
    axios
      .post(`${baseUrl}/logout`, { headers: { authorization: token } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => setIsError(true));
    localStorage.removeItem('token');
    window.location.reload();
    navigate('/login');
  };
  return (
    <header className='h-[60px] flex justify-center shadow-2xl w-full'>
      <Wrapper>
        <div className='w-full flex justify-between'>
          <nav>
            <Link to='/profile'>Profile</Link>
          </nav>
          {isLoggedIn ? <button onClick={logOut}>Log out</button> : ''}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
