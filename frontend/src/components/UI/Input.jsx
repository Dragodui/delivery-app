import React from 'react';

const Input = ({ ...props }) => {
  return (
    <input
      className='focus:outline-none font-normal border-2 border-text w-full py-2 placeholder:text-textWhite bg-secondary rounded-full text-text px-5'
      {...props}
    />
  );
};

export default Input;
