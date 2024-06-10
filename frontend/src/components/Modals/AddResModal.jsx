import React, { useState } from 'react';
import Input from '../UI/Input';
import { useAppSelector } from '../../store/store';
import { baseUrl } from '../../config';
import Button from '../UI/Button';
import axios from 'axios';

const AddResModal = ({ isVisible, setIsVisible }) => {
  const user = useAppSelector((state) => state.user.user);

  const [resInfo, setResInfo] = useState({
    name: '',
    description: '',
    address: '',
    image: '',
    ownerId: user.id,
  });
  console.log(resInfo);

  const registerRes = async () => {
    try {
      const response = await axios.post(`${baseUrl}/restaurants`, resInfo);
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={`fixed flex items-center justify-center top-0 left-0 right-0 font-body bottom-0 bg-[#0000004d]`}
    >
      <form
        className='bg-modalBg px-10 flex border-2 border-text flex-col w-full gap-4 max-w-[600px] py-8 rounded-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className='text-3xl font-bold font-heading'>
          Register new restaurant
        </h1>
        <Input
          value={resInfo.name}
          onChange={(e) =>
            setResInfo({
              ...resInfo,
              name: e.target.value,
            })
          }
          type='text'
          placeholder='Name'
        />
        <Input
          value={resInfo.address}
          onChange={(e) =>
            setResInfo({
              ...resInfo,
              address: e.target.value,
            })
          }
          type='text'
          placeholder='Address'
        />
        <textarea
          value={resInfo.description}
          onChange={(e) =>
            setResInfo({
              ...resInfo,
              description: e.target.value,
            })
          }
          className='focus:outline-none py-2 border-2 rounded-[20px] placeholder:text-textWhite bg-secondary px-5 border-b-black'
          type='text'
          placeholder='Description'
        />
        {/* <div>
          <p className='text-black text-lg font-medium '>Logo of restaurant</p>
          <input
            onChange={(e) => {
              setResInfo({
                ...resInfo,
                image: e.target.files[0],
              });
              console.log(e.target.files[0]);
            }}
            className='focus:outline-none py-2'
            type='file'
            accept='image/*'
          />
        </div> */}
        <Input
          value={resInfo.image}
          onChange={(e) =>
            setResInfo({
              ...resInfo,
              image: e.target.value,
            })
          }
          type='text'
          placeholder='Logo url'
        />
        <Button type='submit' onClick={registerRes}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default AddResModal;
