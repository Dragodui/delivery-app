import React, { useEffect, useState, useRef } from 'react';
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
  const cart = useAppSelector((state) => state.cart.cart);
  const [cartCount, setCartCount] = useState(cart.length);
  const header = useRef();
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
    <header className='h-[60px] flex justify-center shadow-2xl w-full'>
      <Wrapper>
        <div ref={header} className='w-full flex justify-between'>
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
                <div className='rounded-full w-[20px] h-[20px] bg-red-500 relative left-[170px] bottom-[10px] flex items-center justify-center text-white'>
                  {cartCount}
                </div>
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
