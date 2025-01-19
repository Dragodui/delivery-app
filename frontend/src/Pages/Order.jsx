import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../components/UI/Wrapper';
import axios from 'axios';
import { baseUrl } from '../config';
import { format } from 'date-fns';
import Loader from '../components/UI/Loader';
import ListOfItems from '../components/ListOfItems';
import { log } from '../utils';

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
        await log(response);
        const order = response.data.order;
        const products = response.data.products;
        let sum = 0;
        setOrder(order);
        setProducts(products);
        for (const product of products) {
          const cost = product.price * product.quantity;
          sum += cost;
        }
        setTotalPrice(sum);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error while fetching order: ${error}`);
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
          <div className="w-full flex gap-3 flex-wrap flex-col text-text py-[30px] font-body">
            <h1 className="text-3xl font-bold mb-[30px] font-heading">
              {' '}
              Order from {order.restaurantName} on{' '}
              {format(order.date, 'dd.MM.yyyy HH:mm:ss')}
            </h1>
            <ListOfItems list={products} isAddableToCard={true} />
            <p className="font-medium text-xl mt-[20px]">
              Total: {totalPrice}$
            </p>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Order;
