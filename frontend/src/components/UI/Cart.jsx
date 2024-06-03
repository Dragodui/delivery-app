import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config';
import { useAppSelector } from '../../store/store';
import Loader from './Loader';
import ListOfItems from './ListOfItems';
import { useAppDispatch } from '../../store/store';
import { fillCart } from '../../store/features/cartSlice';
import { changeCartState } from '../../store/features/isCartOpenedSlice';
import Button from './Button';
import { IoMdCloseCircle } from 'react-icons/io';
import { IconContext } from 'react-icons';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatchCart = useAppSelector((state) => state.cart.cart);
  const user = useAppSelector((state) => state.user.user);
  const isCartOpened = useAppSelector((state) => state.isCartOpened.isCartOpened);
  const dispatch = useAppDispatch();
  console.log(user);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${baseUrl}/cart/${user.id}`);
        console.log(response.data.cart);
        const fetchedCart = response.data.cart;
        setCart(fetchedCart);
        dispatch(fillCart(fetchedCart));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, []);

  return (
    <div className={`max-w-[280px] overflow-auto top-0 bottom-0 items-center flex flex-col shadow-2xl duration-300 ${isCartOpened ? 'right-0' : 'right-[-100%]'} fixed z-10 bg-white`}>
      <div className='fixed bg-white w-[260px] py-2 px-3 flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Cart</h1>

        <button className='mt-[3px]' onClick={() => dispatch(changeCartState(false))}>
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
      <div className='px-3 py-[60px]'>
        {isLoading ? (
          <Loader />
        ) : (
          <ListOfItems list={dispatchCart} isAddableToCard={true} />
        )}
      </div>
      <Button addStyles={'fixed bottom-[10px] w-[220px]'}>Order</Button>
    </div>
  );
};

export default Cart;
