import React, { useEffect } from 'react';
import Wrapper from '../components/UI/Wrapper';
import { useState } from 'react';
import axios from 'axios';
import Loader from '../components/UI/Loader';
import { baseUrl } from '../config';

const Restaurants = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${baseUrl}/restaurants`);
      setRestaurants(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className='text-3xl font-bold mt-[40px]'>All restaurants</h1>
          <div className='flex flex-wrap gap-3 mt-[30px]'>
            {restaurants.map((res) => (
              <div className='shadow-2xl text-center rounded-xl px-3 py-3'>
                <img src={res.image} alt='' className='max-w-[150px]'/>
                <h1 className='font-bold text-2xl'>{res.name}</h1>
              </div>
            ))}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Restaurants;
