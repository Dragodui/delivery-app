import React from 'react';

const Wrapper = ({ children }) => {
  return (
    <main className='flex items-center justify-center w-full px-3'>
      <div className='max-w-[1200px] w-full flex items-center'>{children}</div>
    </main>
  );
};

export default Wrapper;
