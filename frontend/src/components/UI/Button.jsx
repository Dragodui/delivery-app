import React from 'react';

const Button = ({ children, addStyles, ...props }) => {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded ${addStyles}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
