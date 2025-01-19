import React, { useEffect, useState, useRef } from 'react';
import Wrapper from './UI/Wrapper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Button from './UI/Button';
import { MdLogout } from 'react-icons/md';
import NavBar from './UI/NavBar';
import { changeCartState } from '../store/features/isCartOpenedSlice';
import { log } from '../utils';

const Header = () => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cart = useAppSelector((state) => state.cart.cart);
  const [cartCount, setCartCount] = useState(cart.length);
  const header = useRef();
  const isCartOpened = useAppSelector(
    (state) => state.isCartOpened.isCartOpened,
  );
  console.log(isCartOpened);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${baseUrl}/checkAuth`, {
          headers: { authorization: token },
        });
        const isLoggedInFromResponse = response.data.authenticated;
        setIsLoggedIn(isLoggedInFromResponse);
        await log(response);
      } catch (e) {
        console.log(e);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const logOut = async () => {
   try {
     const token = localStorage.getItem('token');
     setIsError(false);
     const response = await axios.post(`${baseUrl}/logout`, { headers: { authorization: token } })
     
     localStorage.removeItem('token');
     window.location.reload();
     
     await log(response);
     navigate('/login');
   } catch (error) {
     console.error('Error logging out:', error);
     setIsError(true);
    
   }
  };
  return (
    <header className='h-[60px] flex justify-center w-full font-body bg-main'>
      <Wrapper>
        <div ref={header} className='w-full flex justify-between'>
          {isLoggedIn ? (
            <NavBar />
          ) : (
            <h1 className='text-center w-full text-2xl'>Delivery app</h1>
          )}
          <div className='flex items-center gap-0 sm:gap-[40px]'>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    dispatch(changeCartState(!isCartOpened));
                  }}
                  className='flex flex-row'
                >
                  <IconContext.Provider
                    value={{ style: { width: '24px', height: '24px' } }}
                  >
                    <div>
                      <FaShoppingCart />
                    </div>
                  </IconContext.Provider>
                  <div className='rounded-full w-[20px] h-[20px] bg-mainLight text-text left-[-10px] bottom-[8px] relative flex items-center justify-center text-white'>
                    {cartCount}
                  </div>
                </button>
                <Button
                  addStyles={'text-xl flex items-center gap-1 px-0 py-0'}
                  onClick={logOut}
                >
                  <p className='items-center gap-1 sm:flex hidden'>Log out </p>
                  <IconContext.Provider
                    value={{ style: { width: '30px', height: '30px' } }}
                  >
                    <div className='w-[30px] h-[30px]'>
                      <MdLogout />
                    </div>
                  </IconContext.Provider>
                </Button>
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
