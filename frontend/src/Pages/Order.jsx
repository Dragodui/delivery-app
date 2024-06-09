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
        let sum = 0;
        setOrder(order);
        setProducts(order.products);
        for (const product of order.products) {
          const cost = product.price*product.quantity;
          sum+=cost;
        };
        setTotalPrice(sum);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error while fetching order: ${error}`);
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
        <div className='w-full flex border-2 border-text gap-3 bg-secondary flex-wrap flex-col text-textWhite p-[30px] rounded-[30px] font-body'>
          <h1 className='text-3xl font-bold mb-[30px]'>
            {' '}
            Order from {order.restaurantName} on{' '}
            {format(order.date, 'dd.MM.yyyy HH:mm:ss')}
          </h1>
          <ListOfItems list={products} isAddableToCard={true} />
          <p className='font-medium text-xl mt-[20px]'>Total: {totalPrice}$</p>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Order;
