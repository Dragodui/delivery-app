import React from 'react';

const ProfileBlockWrapper = ({ children, title }) => {
  return (
    <div className="min-h-[250px] h-full max-h-[250px] min-w-[300px] sm:max-w-[500px] py-3 px-5 bg-main text-text rounded-lg w-full overflow-auto no-scrollbar max-w-full">
      <h1 className="font-bold text-4xl mb-4 font-heading">{title}</h1>
      {children}
    </div>
  );
};

export default ProfileBlockWrapper;
