import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/store';
import Button from './UI/Button';
import { MdDeleteOutline } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import EditProductModal from './Modals/EditProductModal';
import DeleteProductModal from './Modals/DeleteProductModal';
import { addItemToCart, removeItemFromCart } from '../store/features/cartSlice';
import { baseUrl } from '../config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { log } from '../utils';

const Item = ({
  item,
  isAddableToCard,
  isEditable,
  setIsEdit,
  isEdit,
  handleQuantityChange,
  isInCartPage,
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [cartFromDB, setCartFromDB] = useState([]);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);
  const cart = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    if (cart) {
      setIsInCart(cart.some((cartItem) => cartItem.id === item.id));
      setIsInCart(cart.some((cartItem) => cartItem.id === item.id));
    }
    if (cart.includes(item)) {
      setIsInCart(true);
    }
  }, [cart, item, cartFromDB]);

  const changeCart = async () => {
    const index = cart.findIndex((itemInCart) => itemInCart.id === item.id);
    if (index === -1) {
      dispatch(addItemToCart(item));
      try {
        const response = await axios.post(`${baseUrl}/cart/addToCart`, {
          userId: user.id,
          productId: item.id,
        });

        await log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(removeItemFromCart(item));
      try {
        const response = await axios.post(`${baseUrl}/cart/removeFromCart`, {
          userId: user.id,
          productId: item.id,
        });
        await log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleQuantityChangeLocal = (newQuantity) => {
    setQuantity(newQuantity);
    handleQuantityChange(item, newQuantity);
  };

  return (
    <>
      <Link
        onClick={(e) => e.preventDefault()}
        to={`/products/${item.id}`}
        className="mt-4 rounded-lg flex flex-col justify-center items-center min-h-[230px] shadow-2xl  text-text px-3 py-2"
      >
        {isEditable ? (
          <div className="flex items-center w-full mb-3 justify-between">
            <Button
              onClick={() => setIsDeleteVisible(!isDeleteVisible)}
              addStyles={'bg-red-500'}
            >
              <MdDeleteOutline />
            </Button>
            <Button onClick={() => setIsEditVisible(!isEditVisible)}>
              <MdEdit />
            </Button>
          </div>
        ) : (
          ''
        )}
        <img
          src={item.image}
          alt=""
          className="rounded-lg w-[200px] h-[170px] object-cover"
        />
        <div className="text-center w-full mt-2 justify-between">
          <p >{item.name}</p> 
        </div>

        {isAddableToCard && (
          <>
            {isInCartPage ? (
              <>
                <div className="flex items-center gap-3 bg-slate-400 p-1 max-w-[100px] justify-between rounded-full my-2">
                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        handleQuantityChangeLocal(quantity - 1);
                      }
                    }}
                    className="flex items-center justify-center p-3 rounded-full w-[10px] h-[10px] bg-main"
                  >
                    <p className="font-bold text-text">-</p>
                  </button>
                  <p>{quantity}</p>

                  <button
                    onClick={() => handleQuantityChangeLocal(quantity + 1)}
                    className="flex items-center justify-center p-3 rounded-full w-[10px] h-[10px] bg-main"
                  >
                    <p className="font-bold text-text">+</p>
                  </button>
                </div>
              </>
            ) : (
              ''
            )}
            <div className="flex justify-center w-full mt-2">
              {/* <p className="mb-2">quantity: {item.quantity}</p> */}

              <p>{item.price}$</p>
            </div>
            <Button onClick={changeCart}>
              {isInCart ? 'Remove from cart' : 'Add to cart'}
            </Button>
          </>
        )}
      </Link>
      {isDeleteVisible ? (
        <DeleteProductModal
          productId={item.id}
          isVisible={isDeleteVisible}
          setIsVisible={setIsDeleteVisible}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        />
      ) : (
        ''
      )}
      {isEditVisible ? (
        <EditProductModal
          productId={item.id}
          isVisible={isEditVisible}
          setIsVisible={setIsEditVisible}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Item;
