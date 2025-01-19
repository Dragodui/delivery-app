import React, { useEffect } from 'react';
import Button from './UI/Button';
import { IconContext } from 'react-icons';
import { FaUserCircle } from 'react-icons/fa';
import StarRating from './UI/StarRating';
import { useState } from 'react';
import { baseUrl } from '../config';
import Loader from './UI/Loader';
import axios from 'axios';
import { log } from '../utils';

const Reviews = ({ setIsVisible, resId }) => {
  const [reviewUsers, setReviewUsers] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/restaurant/getReviews/${resId}`,
      );
      console.log(response.data);
      const reviews = response.data;
      setReviews(reviews);
      
      await log(response);
      const userIds = reviews.map((review) => review.userId);
      const uniqueUserIds = [...new Set(userIds)];

      const userPromises = uniqueUserIds.map((userId) =>
        axios.get(`${baseUrl}/user/getUser/${userId}`),
      );
      const users = await Promise.all(userPromises);
      
      await log(response);

      const usersMap = users.reduce((acc, user) => {
        acc[user.data.id] = user.data;
        return acc;
      }, {});

      setReviewUsers(usersMap);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='mt-[30px]'>
          <div className='flex items-center gap-3'>
            <h1 className='text-3xl font-bold font-heading'>Reviews</h1>
            <Button onClick={() => setIsVisible(true)}>Add review</Button>
          </div>
          {reviews.length ? (
            reviews.map((review) => (
              <div key={review.id} className='shadow-2xl rounded-lg py-3 px-3'>
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
                  <StarRating rate={review.rate} />
                </div>
                <p className='text-xl bg-gray-200 rounded-xl py-2 px-3'>
                  {review.opinion}
                </p>
              </div>
            ))
          ) : (
            <p className='text-left mt-[30px] text-gray-500 text-xl font-medium'>
              No reviews yet
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Reviews;
