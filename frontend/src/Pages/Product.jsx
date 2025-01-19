import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../components/UI/Wrapper';
import axios from 'axios';
import { baseUrl } from '../config';
import Loader from '../components/UI/Loader';
import { log } from '../utils';

const Product = () => {
  const { productId } = useParams();
  console.log(productId);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products/${productId}`);
        await log(response);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error while fetching product ${error}`);
      }
    };
    fetchProduct();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='w-full'>
            <h1 className='text-text text-4xl font-bold'>{product.name}</h1>
            <img className='max-w-[400px] rounded-md' src={product.image} alt='' />
            <p className='text-xl mt-[30px]'>{product.description}</p>
            <p className='text-xl'>{product.price}$</p>
        </div>
      )}
    </Wrapper>
  );
};

export default Product;
