import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store/store';
import Wrapper from '../components/UI/Wrapper';
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { CiCirclePlus } from 'react-icons/ci';
import AddResModal from '../components/Modals/AddResModal';
import axios from 'axios';
import { baseUrl } from '../config';
import { format } from 'date-fns';
import Loader from '../components/UI/Loader';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { fillOrders } from '../store/features/ordersSlice';

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const [isAddResModalVisible, setIsAddResModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reses, setReses] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchReses = async () => {
      if (user.role === 'owner') {
        try {
          const response = await axios.get(`${baseUrl}/restaurants/${user.id}`);
          setReses(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/orders/${user.id}`);
        setOrders(response.data.orders);
        dispatch(fillOrders(response.data.order));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    fetchReses();

    setIsLoading(false);
  }, []);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='w-full flex gap-3 flex-wrap items-center py-[30px] font-body'>
            <div className=' min-h-[250px] min-w-[300px] max-h-[300px] flex-1 py-3 px-5 rounded-lg  w-20 bg-main text-text'>
              <h1 className='font-bold text-4xl mb-4 font-heading'>Profile</h1>
              <div className='flex items-center gap-3'>
                <IconContext.Provider
                  value={{ style: { width: '60px', height: '60px' } }}
                >
                  <div>
                    <FaUserCircle />
                  </div>
                </IconContext.Provider>
                <p className='text-2xl'>{user.name}</p>
              </div>
              <div className='mt-3'>
                <p className='text-lg font-medium'>Email: {user.email}</p>
              </div>
            </div>
            <div className=' py-3 min-h-[250px] px-5 bg-main text-text rounded-lg overflow-auto no-scrollbar max-h-[250px] flex-auto w-80'>
              <h1 className='font-bold text-4xl mb-4 font-heading text-left'>
                Orders
              </h1>
              <div className='flex flex-col gap-3'>
                {user.orders === undefined || user.orders.length === 0 ? (
                  <p className='text-center mt-[40px] text-gray-500 text-xl font-medium'>
                    You have no orders yet
                  </p>
                ) : (
                  orders.map((order, index) => (
                    <Link
                      className='bg-mainLight px-4 rounded-2xl py-3'
                      to={`/orders/${order._id}`}
                      key={order._id}
                    >
                      {index + 1}. Order from {order.restaurantName} on{' '}
                      {format(order.date, 'dd.MM.yyyy HH:mm:ss')}
                    </Link>
                  ))
                )}
              </div>
            </div>
            {user.role === 'owner' ? (
              <div className=' py-3 px-5 bg-main text-text rounded-lg w-full overflow-auto no-scrollbar max-w-full'>
                <h1 className='font-bold text-4xl font-heading'>
                  Your restaurants
                </h1>
                <div className='flex justify-start flex-wrap mt-[20px] gap-5 items-center'>
                  {reses.map((res) => (
                    <div
                      key={res._id}
                      className='p-5 bg-textWhite rounded-lg'
                    >
                      <Link
                        to={`/my_restaurant/${res._id}`}
                        className='flex flex-col items-center'
                      >
                        <h2 className='font-medium text-2xl mb-3'>
                          {res.name}
                        </h2>
                        <img
                          className='w-[100px] h-[100px]'
                          src={res.image}
                          alt=''
                        />
                      </Link>
                    </div>
                  ))}
                  <button
                    onClick={() => setIsAddResModalVisible(true)}
                    className='text-center text-text flex w-[100px] h-[100px] items-center justify-center hover:translate-y-[-10px] duration-300 border-2 border-text bg-gray-300 text-white py-3 px-5 rounded-2xl text-xl font-medium'
                  >
                    <IconContext.Provider
                      value={{ style: { width: '60px', height: '60px' } }}
                    >
                      <div>
                        <CiCirclePlus />
                      </div>
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          {isAddResModalVisible ? (
            <AddResModal
              isVisible={isAddResModalVisible}
              setIsVisible={setIsAddResModalVisible}
            />
          ) : (
            ''
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
