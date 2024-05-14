import React from 'react';

const Button = ({children, addStyles, ...props}) => {
    return (
        <button className={`shadow-3xl font-bold px-5 py-3 duration-300 transition-all rounded-lg hover:shadow-4xl ${addStyles}`} {...props}>
            {children}
        </button>
    );
};

export default Button;