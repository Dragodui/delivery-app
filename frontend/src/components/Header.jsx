import React, { useEffect, useState, useRef } from 'react';
import Wrapper from './UI/Wrapper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Button from './UI/Button';
import { MdLogout } from 'react-icons/md';
import NavBar from './UI/NavBar';

const Header = () => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cart = useAppSelector((state) => state.cart.cart);
  const [cartCount, setCartCount] = useState(cart.length);
  const header = useRef();

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

  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);

  const logOut = async () => {
    const token = localStorage.getItem('token');
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
    <header className='h-[60px] flex justify-center w-full font-body bg-main'>
      <Wrapper>
        <div ref={header} className='w-full flex justify-between'>
          {isLoggedIn ? (
           <NavBar/>
          ) : (
            
            <h1 className='text-center w-full text-2xl'>Delivery app</h1>
          )}
          <div className='flex items-center gap-0 sm:gap-[40px]'>
            {isLoggedIn ? (
              <>
                <div className='rounded-full w-[20px] h-[20px] bg-mainLight text-text relative left-[80px] bottom-[10px] flex items-center justify-center text-white'>
                  {cartCount}
                </div>
                <Link to='/cart'>
                  <IconContext.Provider
                    value={{ style: { width: '24px', height: '24px' } }}
                  >
                    <div>
                      <FaShoppingCart />
                    </div>
                  </IconContext.Provider>
                </Link>
                <Button addStyles={'text-xl'} onClick={logOut}>
                  <p className='items-center gap-1 sm:flex hidden'>Log out <MdLogout /></p>
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
