import React, { useEffect, useState } from 'react';
import Wrapper from './UI/Wrapper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { changeCartState } from '../store/features/isCartOpenedSlice';
import { useAppDispatch } from '../store/store';

const Header = () => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

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
          console.log('Error fetching authentication');
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
          <nav className='flex items-center gap-3'>
            <Link to='/profile'>Profile</Link>
            <Link to='/restaurants'>Restaurants</Link>
            {user.role === 'owner' ? (
              <Link to='/my_restaurant'>My restaurants</Link>
            ) : (
              ''
            )}
          </nav>
          <div className='flex items-center gap-[40px]'>
            {isLoggedIn ? (
              <>
                <button onClick={logOut}>Log out</button>
                <button onClick={() => dispatch(changeCartState(true))}>
                  <IconContext.Provider
                    value={{ style: { width: '24px', height: '24px' } }}
                  >
                    <div>
                      <FaShoppingCart />
                    </div>
                  </IconContext.Provider>
                </button>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
