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
import Button from '../components/UI/Button';
import ProfileBlockWrapper from '../components/UI/ProfileBlockWrapper';
import { log } from '../utils';

//TODO: add modal for accepting delivery

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const [isAddResModalVisible, setIsAddResModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reses, setReses] = useState([]);
  const [deliverymanOrder, setDeliverymanOrder] = useState(null);
  const [deliverymanCompletedOrders, setDeliverymanCompletedOrders] = useState(
    [],
  );
  const dispatch = useAppDispatch();

  const fetchReses = async () => {
    if (user.role === 'owner') {
      try {
        const response = await axios.get(`${baseUrl}/restaurants/${user.id}`);
        await log(response);
        setReses(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchOrders = async () => {
    try {
      const link =
        user.role === 'deliveryman'
          ? `${baseUrl}/delivery/availableOrders`
          : `${baseUrl}/orders/${user.id}`;
      const response = await axios.get(link);
      await log(response);
      setOrders(response.data.orders);
      dispatch(fillOrders(response.data.order));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDeliverOrder = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${baseUrl}/delivery/currentDeliverymanOrder/${user.id}`,
      );
      await log(response);
      setDeliverymanOrder(response.data.order);
      console.log('HERE WE ARE:');
      console.log(response.data.order);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const takeOrder = async (order) => {
    try {
      const response = await axios.post(`${baseUrl}/delivery/takeOrder`, {
        userId: user.id,
        orderId: order.id,
      });
      await log(response);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompletedOrders = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/delivery/completedOrders/${user.id}`,
      );
      await log(response);
      setDeliverymanCompletedOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const finishOrder = async (orderId, e) => {
    e.preventDefault();
    try {
      const link =
        user.role === 'deliveryman'
          ? `${baseUrl}/delivery/finishOrder/${orderId}`
          : `${baseUrl}/orders/finishOrder/${orderId}`;
      const response = await axios.post(link);
      await log(response);
      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchReses();
    if (user.role === 'deliveryman') fetchCompletedOrders();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user.role === 'deliveryman') fetchDeliverOrder();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='w-full flex gap-3 flex-wrap items-center py-[30px] font-body'>
            <ProfileBlockWrapper title={'Profile'}>
              <div className='flex items-center gap-3'>
                <IconContext.Provider
                  value={{ style: { width: '60px', height: '60px' } }}
                >
                  <div className='bg-textWhite rounded-full p-1'>
                    <FaUserCircle />
                  </div>
                </IconContext.Provider>
                <p className='text-2xl'>{user.name}</p>
              </div>
              <div className='mt-3'>
                <p className='text-lg font-medium'>Email: {user.email}</p>
              </div>
            </ProfileBlockWrapper>
            <ProfileBlockWrapper
              title={
                user.role === 'deliveryman' ? 'Available orders' : 'Orders'
              }
            >
              <div className='flex flex-col gap-3'>
                {orders === undefined || orders.length === 0 ? (
                  <p className='text-center mt-[40px] text-gray-500 text-xl font-medium'>
                    {user.role === 'deliveryman'
                      ? 'No available orders yet'
                      : 'You have no orders yet'}
                  </p>
                ) : (
                  orders.map((order, index) => (
                    <Link
                      className='bg-mainLight px-4 rounded-2xl py-3 flex justify-between'
                      to={`/orders/${order.id}`}
                      key={order.id}
                    >
                      <div>
                        {index + 1}. Order from {order.restaurantName} on{' '}
                        {format(order.date, 'dd.MM.yyyy HH:mm:ss')}
                        <p>Status: {order.status}</p>
                      </div>
                      {user.role === 'deliveryman' &&
                      deliverymanOrder === null ? (
                        <Button onClick={() => takeOrder(order)}>take</Button>
                      ) : (
                        ''
                      )}
                      {user.role === 'user' &&
                      order.status === 'Delivered for deliveryman' ? (
                        <Button onClick={(e) => finishOrder(order.id, e)}>
                          Accept delivery
                        </Button>
                      ) : (
                        ''
                      )}
                    </Link>
                  ))
                )}
              </div>
            </ProfileBlockWrapper>
            {user.role === 'owner' ? (
              <ProfileBlockWrapper title={'Your restaurants'}>
                <div className='flex justify-start flex-wrap mt-[20px] gap-5 items-center'>
                  {reses.map((res) => (
                    <div key={res.id} className='p-5 bg-textWhite rounded-lg'>
                      <Link
                        to={`/my_restaurant/${res.id}`}
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
              </ProfileBlockWrapper>
            ) : (
              ''
            )}
            {user.role === 'deliveryman' ? (
              <>
                <ProfileBlockWrapper title={'Your Current Order'}>
                  {deliverymanOrder !== null &&
                  deliverymanOrder.status !== 'Delivered' ? (
                    <>
                      <p className='text-xl'>
                        Date:{' '}
                        {format(deliverymanOrder.date, 'dd.MM.yyyy HH:mm:ss')}{' '}
                      </p>
                      <p className='text-xl'>
                        From: {deliverymanOrder.restaurantName}
                      </p>
                      <p className='text-xl'>Items:</p>
                      <div>
                        {deliverymanOrder.products.map((item) => (
                          <p>- {item.name}</p>
                        ))}
                      </div>
                      <Button
                        onClick={(e) => finishOrder(deliverymanOrder.id, e)}
                        addStyles={'bg-mainLight text-xl mt-3'}
                      >
                        Mark as delivered
                      </Button>
                    </>
                  ) : (
                    <p className='text-xl'>No current order</p>
                  )}
                </ProfileBlockWrapper>
                <ProfileBlockWrapper title={'Completed orders'}>
                 <div className="flex flex-col gap-3">
                 {deliverymanCompletedOrders.map((order, index) => (
                    <Link
                      className='bg-mainLight px-4 rounded-2xl py-3 flex justify-between'
                      to={`/orders/${order.id}`}
                      key={order.id}
                    >
                      {' '}
                      <div>
                        {index + 1}. Order from {order.restaurantName} on{' '}
                        {format(order.date, 'dd.MM.yyyy HH:mm:ss')}
                        <p>Status: {order.status}</p>
                      </div>
                    </Link>
                  ))}
                 </div>
                </ProfileBlockWrapper>
              </>
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
