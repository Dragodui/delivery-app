import React from 'react';
import { useAppSelector } from '../store/store';
import Wrapper from '../components/UI/Wrapper';
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  console.log(user);

  return (
    <Wrapper>
      <div className='grid grid-cols-4 gap-4 w-full'>
        <div className='mt-[40px] shadow-2xl min-h-[250px] py-3 px-5 rounded-xl w-full max-w-[300px]'>
          <h1 className='font-bold text-2xl mb-4'>Profile</h1>
          <div className='flex items-center gap-3'>
            <IconContext.Provider
              value={{ style: { width: '60px', height: '60px' } }}
            >
              <div>
                <FaUserCircle />
              </div>
            </IconContext.Provider>
            <div className='text-2xl'>{user.name}</div>
          </div>
          <div className='mt-3'>
            <p className='text-lg font-medium'>Email: {user.email}</p>
            <p className='text-lg font-medium'>Role: {user.role}</p>
          </div>
        </div>
        <div className='mt-[40px] shadow-2xl py-3 min-h-[250px] px-5 rounded-xl w-full max-w-[300px]'>
          <h1 className='font-bold text-2xl mb-4'>Orders</h1>
          <div>
            {user.orders === undefined || user.orders.length === 0 ? (
              <p className='text-center mt-[70px] text-gray-500 text-xl font-medium'>
                You have no orders yet
              </p>
            ) : (
              user.orders.map((order) => <div>{order.restaurant}</div>)
            )}
          </div>
        </div>
        {user.role === 'owner' ? (
          <div className='mt-[40px] shadow-2xl py-3 min-h-[250px] px-5 rounded-xl w-full max-w-[300px]'>
            <h1 className='font-bold text-2xl mb-4'>Your restaurant</h1>
            <div className='flex justify-center'>
              {user.restaurant === null ? (
                <button className='text-center mt-[70px] bg-gray-400 text-white py-3 px-5 rounded-xl text-xl font-medium'>
                  register restaurant
                </button>
              ) : (
                user.orders.map((order) => <div>{order.restaurant}</div>)
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </Wrapper>
  );
};

export default Profile;
