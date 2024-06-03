import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';
import Wrapper from '../components/UI/Wrapper';
import ListOfItems from '../components/ListOfItems';
import Loader from '../components/UI/Loader';
import { FaLocationDot } from 'react-icons/fa6';

const Restaurant = () => {
  const { resId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState({});
  const [resMenu, setResMenu] = useState([]);
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${baseUrl}/restaurant/${resId}`);
        setRes(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchResMenu = async () => {
      try {
        const response = await axios.get(`${baseUrl}/restaurantsMenu/${resId}`);
        setResMenu(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRestaurant();
    fetchResMenu();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='mt-[50px] shadow-2xl rounded-xl py-4 px-3'>
          <div>
            <div className='flex items-center gap-4 justify-between'>
              <p className='text-3xl font-medium'>{res.name}</p>
              <img className='max-w-[80px]' src={res.image} alt='' />
            </div>
            <div className='flex gap-3 items-center'>
              <FaLocationDot />
              <p className='text-lg'>{res.address}</p>
            </div>
          </div>
          <div className='mt-[30px]'>
            <h1 className='text-3xl font-bold'>Menu:</h1>
            <ListOfItems isAddableToCard={true} list={resMenu}/>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Restaurant;
