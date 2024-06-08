import React from 'react';

const Input = ({ ...props }) => {
  return (
    <input
      className='focus:outline-none w-full py-2 border-b-2 border-b-black'
      {...props}
    />
  );
};

export default Input;
