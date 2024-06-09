import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../config';
import Wrapper from '../components/UI/Wrapper';
import ListOfItems from '../components/ListOfItems';
import Loader from '../components/UI/Loader';
import { FaLocationDot } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import AddReviewModal from '../components/Modals/AddReviewModal';
import Button from '../components/UI/Button';
import { IconContext } from 'react-icons';

const Restaurant = () => {
  const { resId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [res, setRes] = useState({});
  const [reviews, setReviews] = useState([]);
  const [resMenu, setResMenu] = useState([]);
  const [reviewUsers, setReviewUsers] = useState({});
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

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/restaurant/getReviews/${resId}`,
        );
        console.log(response.data);
        const reviews = response.data;
        setReviews(reviews);

        const userIds = reviews.map((review) => review.userId);
        const uniqueUserIds = [...new Set(userIds)];

        const userPromises = uniqueUserIds.map((userId) =>
          axios.get(`${baseUrl}/user/getUser/${userId}`),
        );
        const users = await Promise.all(userPromises);

        const usersMap = users.reduce((acc, user) => {
          acc[user.data._id] = user.data;
          return acc;
        }, {});

        setReviewUsers(usersMap);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllData = async () => {
      await Promise.all([fetchRestaurant(), fetchResMenu(), fetchReviews()]);
      setIsLoading(false);
    };

    fetchAllData();
  }, [resId]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='mt-[50px] shadow-2xl rounded-xl py-4 px-3 font-body'>
          <div>
            <div className='flex items-center gap-4 justify-between'>
              <div className='flex items-center gap-2'>
                <p className='text-3xl font-medium font-heading'>{res.name}</p>
              </div>
              <img className='max-w-[80px]' src={res.image} alt='' />
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
          <div className='mt-[30px]'>
            <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-bold font-heading'>Reviews</h1>
                <Button onClick={() => setIsVisible(true)}>Add review</Button>
              </div>
            {reviews.length ? reviews.map((review) => (
              <div key={review._id} className='shadow-2xl rounded-xl py-3 px-3'>
                <div className='flex gap-3 items-center mb-3'>
                  <div className='flex items-center gap-1'>
                    <IconContext.Provider
                      value={{ style: { width: '30px', height: '30px' } }}
                    >
                      <div>
                        <FaUserCircle />
                      </div>
                    </IconContext.Provider>
                    <p className='text-2xl'>
                      {reviewUsers[review.userId]?.name || 'Loading...'}
                    </p>
                  </div>
                  <p className='flex items-center justify-center font-bold w-[30px] h-[30px] rounded-full bg-yellow-300 text-red-500'>
                    {review.rate}
                  </p>
                </div>
                <p className='text-xl bg-gray-200 rounded-xl py-2 px-3'>
                  {review.opinion}
                </p>
              </div>
            )) : <p className='text-left mt-[30px] text-gray-500 text-xl font-medium'>No reviews yet</p>}
          </div>
        </div>
      )}
      {
        isVisible
        ? <AddReviewModal isVisible={isVisible} setIsVisible={setIsVisible} resId={resId}/>
        : ""
      }
    </Wrapper>
  );
};

export default Restaurant;
