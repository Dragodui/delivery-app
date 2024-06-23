import React from 'react';
import Input from '../UI/Input';
import { useState } from 'react';
import Button from '../UI/Button';
import axios from 'axios';
import { baseUrl } from '../../config';
import { useAppSelector } from '../../store/store';

const AddReviewModal = ({ resId, isVisible, setIsVisible }) => {
  const userId = useAppSelector((state) => state.user.user).id;
  const [error, setError] = useState('');
  const [row, setRow] = useState({
    rate: 1,
    opinion: '',
  });

  const handleInputChange = (field, value) => {
    setRow({ ...row, [field]: value });
  };

  const addReview = async () => {
    try {
      const response = await axios.post(`${baseUrl}/user/newReview/${resId}`, {
        opinion: row.opinion,
        rate: parseInt(row.rate),
        userId: userId,
      });
      setIsVisible(false);
    } catch (error) {
      setError('Error: You already reviewed this restaurant');
      console.log(`Error while editing product ${error}`);
    }
  };

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={`fixed flex items-center justify-center top-0 left-0 px-3 right-0 bottom-0 bg-[#0000004d]`}
    >
      <form
        className='bg-textWhite px-10 border-2 border-text flex flex-col w-full gap-4 max-w-[800px] font-body py-8 rounded-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='table-container table-class w-full'>
          <h1 className='text-3xl font-bold font-heading mb-[30px]'>Add new review</h1>
          <table className='w-full table'>
            <thead>
              <tr className='font-heading'>
                <th className='text-left'>Rate</th>
                <th className='text-left'>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    className='rounded-sm px-3 py-1 bg-main text-text'
                    value={row.rate}
                    onChange={(e) => handleInputChange('rate', e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </td>
                <td>
                  <Input
                    type='text'
                    placeholder='opinion'
                    value={row.opinion}
                    onChange={(e) =>
                      handleInputChange('opinion', e.target.value)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className='text-red-500'>{error}</p>
        <Button onClick={addReview}>Add review</Button>
      </form>
    </div>
  );
};

export default AddReviewModal;
