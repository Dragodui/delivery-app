import React from 'react';

const Button = ({ children, addStyles, ...props }) => {
  return (
    <button
      className={`bg-main text-text font-body px-4 py-2 rounded-md ${addStyles}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
