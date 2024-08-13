import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../config';
import { useAppSelector } from '../store/store';
import Loader from './UI/Loader';
import ListOfItems from './ListOfItems';
import { useAppDispatch } from '../store/store';
import { fillCart } from '../store/features/cartSlice';
import OrderNotificationModal from './Modals/OrderNotificationModal';
import { changeCartState } from '../store/features/isCartOpenedSlice';
import Button from './UI/Button';
import { IoMdCloseCircle } from 'react-icons/io';
import { IconContext } from 'react-icons';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCartSum, setCartSum] = useState(0);
  const [isOrderNotificationModalVisible, setIsOrderNotificationModalVisible] =
    useState(false);
  const dispatchCart = useAppSelector((state) => state.cart.cart);
  const user = useAppSelector((state) => state.user.user);
  const isCartOpened = useAppSelector(
    (state) => state.isCartOpened.isCartOpened,
  );
  const dispatch = useAppDispatch();

  const createOrder = async () => {
    try {
      const response = await axios.post(`${baseUrl}/orders/makeOrder`, {
        items: cart,
        userId: user.id,
      });
      console.log(response);
      setIsOrderNotificationModalVisible(true);
      try {
        const clearCartResponse = await axios.post(
          `${baseUrl}/cart/clearCart`,
          {
            userId: user.id,
          },
        );
        console.log(clearCartResponse.data);
        setCart([]);
        dispatch(fillCart([]));
      } catch (error) {
        console.log(`Error while clearing the cart: ${error}`);
      }
    } catch (error) {
      console.log(`Error while order: ${error}`);
    }
  };

  useEffect(() => {
    setCart(dispatchCart);
  }, [dispatchCart]);

  useEffect(() => {
    const calculateCartSum = () => {
      let sum = 0;
      for (const item of cart) {
        sum += item.price * item.quantity;
      }
      setCartSum(sum);
    };
    calculateCartSum();
  }, [cart]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${baseUrl}/cart/${user.id}`);
        const fetchedCart = response.data.cart;
        setCart(fetchedCart);
        dispatch(fillCart(fetchedCart));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchCart();
  }, []);

  const handleQuantityChange = (item, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem,
      ),
    );
  };

  return (
    <div
      className={`max-w-[280px] w-full bg-textWhite overflow-auto top-0 bottom-0 items-center flex flex-col shadow-2xl duration-300 ${
        isCartOpened ? 'right-0' : 'right-[-100%]'
      } fixed z-10 bg-white`}
    >
      <div className='fixed bg-textWhite w-[250px] py-2 px-3 flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Cart</h1>

        <button
          className='mt-[3px]'
          onClick={() => dispatch(changeCartState(false))}
        >
          {' '}
          <IconContext.Provider
            value={{ style: { width: '40px', height: '40px' } }}
          >
            <div>
              <IoMdCloseCircle />
            </div>
          </IconContext.Provider>
        </button>
      </div>
      <div className='px-3 py-[60px] font-medium flex items-center justify-center h-full pt-[230px] mb-[100px]'>
        {isLoading ? (
          <Loader />
        ) : (
          <ListOfItems
            addStyles={'flex-col'}
            list={dispatchCart}
            isAddableToCard={true}
            handleQuantityChange={handleQuantityChange}
            isInCartPage={true}
          />
        )}
      </div>
      <div className='fixed bottom-[10px] w-[220px] flex flex-col gap-2 bg-textWhite py-[10px] px-[10px] rounded-lg'>
        {cart.length ? (
          <>
            <p className='text-xl font-medium'>Total: {totalCartSum}$</p>
            <Button onClick={createOrder} addStyles={'w-full'}>
              Order
            </Button>
          </>
        ) : (
          ''
        )}
      </div>
      <OrderNotificationModal
        isVisible={isOrderNotificationModalVisible}
        setIsVisible={setIsOrderNotificationModalVisible}
      />
    </div>
  );
};

export default Cart;
