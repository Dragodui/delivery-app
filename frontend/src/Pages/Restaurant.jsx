import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';
import Wrapper from '../components/UI/Wrapper';
import ListOfItems from '../components/ListOfItems';
import Loader from '../components/UI/Loader';
import { FaLocationDot } from 'react-icons/fa6';
import AddReviewModal from '../components/Modals/AddReviewModal';
import Reviews from '../components/Reviews';

const Restaurant = () => {
  const { resId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState({});
  const [resMenu, setResMenu] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`${baseUrl}/restaurant/${resId}`);
        console.log(response.data);
        setRes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchResMenu = async () => {
      try {
        const response = await axios.get(`${baseUrl}/restaurantsMenu/${resId}`);
        setResMenu(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllData = async () => {
      await Promise.all([fetchRestaurant(), fetchResMenu()]);
      setIsLoading(false);
    };

    fetchAllData();
  }, [resId]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='mt-[50px] font-body w-full'>
          <div>
            <div className='flex items-center gap-4 justify-between'>
              <div className='flex items-center gap-2'>
                <p className='text-4xl font-bold font-heading'>{res.name}</p>
              </div>
              <img className='max-w-[100px]' src={res.image} alt='' />
            </div>
            <div className='flex gap-3 items-center'>
              <FaLocationDot />
              <p className='text-lg'>{res.address}</p>
            </div>
          </div>
          <div className='mt-[30px]'>
            <h1 className='text-3xl font-bold font-heading'>Menu</h1>
            <ListOfItems isAddableToCard={true} list={resMenu} />
          </div>
          <Reviews setIsVisible={setIsVisible} resId={resId} />
        </div>
      )}
      {isVisible ? (
        <AddReviewModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          resId={resId}
        />
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default Restaurant;
