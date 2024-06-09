import React from 'react';

const Button = ({ children, addStyles, ...props }) => {
  return (
    <button
      className={`bg-primary text-textWhite font-body border-2 border-text text-white px-4 py-2 rounded-xl ${addStyles}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
