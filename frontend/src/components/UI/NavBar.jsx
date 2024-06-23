import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='flex items-center gap-3'>
      <Link className='text-xl' to='/profile'>
        Profile
      </Link>
      <Link className='text-xl' to='/restaurants'>
        Restaurants
      </Link>
    </nav>
  );
};

export default NavBar;
