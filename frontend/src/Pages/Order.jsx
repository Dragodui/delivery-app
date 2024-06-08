import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../components/UI/Wrapper';
import axios from 'axios';
import { baseUrl } from '../config';
import { format } from 'date-fns';
import Loader from '../components/UI/Loader';
import ListOfItems from '../components/ListOfItems';

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${baseUrl}/orders/order/${orderId}`);
        const order = response.data.order;
        setOrder(order);
        for (const productId of order.products) {
          const exists = products.some((obj) => obj._id === productId);
          if (!exists) {
            fetchProduct(productId);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.log(`Error while fetching order: ${error}`);
      }
    };
    const fetchProduct = async (productId) => {
      try {
        const response = await axios.get(`${baseUrl}/products/${productId}`);
        const fetchedProduct = response.data;
        setProducts((prevProducts) => [...prevProducts, fetchedProduct]);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice + fetchedProduct.price,
        );
      } catch (error) {
        console.log(`Error while fetching product: ${error}`);
      }
    };
    fetchOrder();
  }, []);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className='text-3xl font-bold mb-[30px]'>
            {' '}
            Order from {order.restaurantName} on{' '}
            {format(order.date, 'dd.MM.yyyy HH:mm:ss')}
          </h1>
          <ListOfItems list={products} isAddableToCard={true} />
          <p className='font-medium text-xl mt-[20px]'>Total: {totalPrice}$</p>
        </>
      )}
    </Wrapper>
  );
};

export default Order;
