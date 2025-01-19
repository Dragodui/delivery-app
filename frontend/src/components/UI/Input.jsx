import React from 'react';

const Input = ({ ...props }) => {
  return (
    <input
      className="focus:outline-none border-b-2 border-text  font-normal w-full py-2 rounded-0 text-text"
      {...props}
    />
  );
};

export default Input;
