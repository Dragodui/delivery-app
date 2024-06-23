import React, { useEffect, useState } from 'react';
import Wrapper from '../components/UI/Wrapper';
import axios from 'axios';
import { baseUrl } from '../config';
import Loader from '../components/UI/Loader';
import ListOfItems from '../components/ListOfItems';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fillCart } from '../store/features/cartSlice';
import Button from '../components/UI/Button';
import OrderNotificationModal from '../components/Modals/OrderNotificationModal';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCartSum, setCartSum] = useState(0);
  const [isOrderNotificationModalVisible, setIsOrderNotificationModalVisible] =
    useState(false);
  const dispatchCart = useAppSelector((state) => state.cart.cart);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  console.log(cart);

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
    let sum = 0;
    for (const item of cart) {
      sum += item.price * item.quantity;
    }
    setCartSum(sum);
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
    console.log(item);
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem,
      ),
    );
  };

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='w-full flex gap-3 flex-wrap flex-col text-text py-[30px] rounded-[30px] font-body'>
            <h1 className='text-4xl font-bold mb-[10px] font-heading'>Cart</h1>
            <div className='flex flex-col gap-3'>
              <ListOfItems
                list={cart}
                isAddableToCard={true}
                handleQuantityChange={handleQuantityChange}
                isInCartPage={true}
              />
              {cart.length ? (
                <>
                  <p className='text-xl font-medium'>Total: {totalCartSum}$</p>
                  <Button onClick={createOrder} addStyles={'max-w-[230px]'}>
                    Order
                  </Button>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        )}
      </Wrapper>
      <OrderNotificationModal
        isVisible={isOrderNotificationModalVisible}
        setIsVisible={setIsOrderNotificationModalVisible}
      />
    </>
  );
};

export default CartPage;
