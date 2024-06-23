import React, { useEffect } from 'react';
import Wrapper from '../components/UI/Wrapper';
import { useState } from 'react';
import axios from 'axios';
import Loader from '../components/UI/Loader';
import { baseUrl } from '../config';
import { Link } from 'react-router-dom';

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
        <div className='w-full flex text-text gap-3 flex-col flex-wrap py-[30px] font-body'>
          <h1 className='text-4xl font-bold font-heading'>All restaurants</h1>
          <div className='flex font-body flex-wrap gap-3 mt-[30px]'>
            {restaurants.map((res) => (
              <Link
                key={res._id}
                to={`/restaurants/${res._id}`}
                className='shadow-2xl text-center rounded-lg  px-3 py-3'
              >
                <img
                  src={res.image}
                  alt=''
                  className='max-w-[150px] rounded-xl'
                />
                <h1 className='font-bold text-2xl'>{res.name}</h1>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Restaurants;
