import React, { useEffect, useState } from 'react';
import Wrapper from '../components/UI/Wrapper';
import Loader from '../components/UI/Loader';
import { useAppSelector } from '../store/store';
import axios from 'axios';
import { baseUrl } from '../config';
import { FaLocationDot } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";

const ResOwnerPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state) => state.user.user);
  const [res, setRes] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/restaurants/${user.id}`)
      .then((res) => {
        console.log(res.data);
        setRes(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className='text-3xl font-bold mt-[40px]'>Your restaurant</h1>
          <div className='flex flex-col shadow-2xl px-4 py-3 rounded-2xl mt-[20px] max-w-[500px]'>
            <h2 className='flex text-2xl items-center gap-3'><RiProfileFill />{res.name}</h2>
            <h2 className='flex text-2xl items-center gap-3'><FaLocationDot />{res.address}</h2>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default ResOwnerPanel;
