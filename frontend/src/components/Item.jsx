import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/store';
import Button from './UI/Button';
import { MdDeleteOutline } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import EditProductModal from './EditProductModal';
import {
  addItemToCart,
  removeItemFromCart,
  fillCart,
} from '../store/features/cartSlice';
import { baseUrl } from '../config';
import axios from 'axios';

const Item = ({ item, isAddableToCard, isEditable, setIsEdit, isEdit }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [cartFromDB, setCartFromDB] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);
  const cart = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    if (cart) {
      setIsInCart(cart.some((cartItem) => cartItem._id === item._id));
    }
    if (cart.includes(item)) {
      setIsInCart(true);
    }
  }, [cart, item, cartFromDB]);

  const changeCart = async () => {
    const index = cart.findIndex((itemInCart) => itemInCart._id === item._id);
    if (index === -1) {
      dispatch(addItemToCart(item));
      try {
        const response = await axios.post(`${baseUrl}/cart/addToCart`, {
          userId: user.id,
          productId: item._id,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch(removeItemFromCart(item));
      try {
        const response = await axios.post(`${baseUrl}/cart/removeFromCart`, {
          userId: user.id,
          productId: item._id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='mt-4 rounded-xl flex flex-col justify-between min-h-[230px] shadow-2xl px-3 py-2'>
      {isEditable ? (
        <div className='flex items-center justify-between'>
          <Button addStyles={'bg-red-500'}>
            <MdDeleteOutline />
          </Button>
          <Button onClick={() => setIsVisible(!isVisible)}>
            <MdEdit />
          </Button>
        </div>
      ) : (
        ''
      )}
      <img src={item.image} alt='' className='rounded-xl max-w-[200px]' />
      <div className='flex justify-between'>
        <p>{item.name}</p>
        <p>{item.price} $</p>
      </div>
      {isAddableToCard && (
        <button
          onClick={changeCart}
          className='bg-black text-white py-2 px-4 rounded-xl'
        >
          {isInCart ? 'Remove from cart' : 'Add to cart'}
        </button>
      )}
      {isVisible ? (
        <EditProductModal productId={item._id} isVisible={isVisible} setIsEdit={setIsEdit} isEdit={isEdit} setIsVisible={setIsVisible} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Item;
