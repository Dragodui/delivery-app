import React, { useEffect, useState } from 'react';
import Wrapper from '../components/UI/Wrapper';
import Loader from '../components/UI/Loader';
import { useAppSelector } from '../store/store';
import Button from '../components/UI/Button';
import axios from 'axios';
import { baseUrl } from '../config';
import ListOfItems from '../components/ListOfItems';
import AddMenuItemsModal from '../components/AddMenuItemsModal';
import { FaLocationDot } from 'react-icons/fa6';
import { RiProfileFill } from 'react-icons/ri';

const ResOwnerPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const [res, setRes] = useState(null);
  const [menu, setMenu] = useState([]);

  const fetchRes = () => {
    axios
      .get(`${baseUrl}/restaurants/${user.id}`)
      .then((res) => {
        console.log(res.data);
        setRes(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchMenu = async () => {
    try {
      console.log(res._id);
      const response = await axios.get(`${baseUrl}/restaurantsMenu/${res._id}`);
      setMenu(response.data);
    } catch (error) {
      console.error('Error getting menu items:', error);
    }
  };

  useEffect(() => {
    fetchRes();
  }, []);

  useEffect(() => {
    fetchRes();
  }, [user]);

  useEffect(() => {
    fetchMenu();
  }, [res]);

  useEffect(() => {
    fetchMenu();
  }, [isAddItemModalVisible]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className='text-3xl font-bold mt-[40px]'>Your restaurant</h1>
          <div className='flex flex-col shadow-2xl px-4 py-3 rounded-2xl mt-[20px]'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='flex text-2xl items-center gap-3'>
                  <RiProfileFill />
                  {res.name}
                </h2>
                <h2 className='flex text-2xl items-center gap-3'>
                  <FaLocationDot />
                  {res.address}
                </h2>
              </div>
              <img className='max-w-[150px]' src={res.image} alt='' />
            </div>
            <div className='mt-5 shadow-2xl p-4 rounded-lg'>
              <div className='flex justify-between'>
                <h2 className='flex text-2xl items-center font-bold gap-3'>
                  Menu
                </h2>
                <Button onClick={() => setIsAddItemModalVisible(true)}>
                  Add new item
                </Button>
              </div>
              <ListOfItems isAddableToCard={false} list={menu} />
            </div>
          </div>
        </>
      )}
      {isAddItemModalVisible ? (
        <AddMenuItemsModal
          res={res}
          isVisible={isAddItemModalVisible}
          setIsVisible={setIsAddItemModalVisible}
        />
      ) : (
        ''
      )}
    </Wrapper>
  );
};

export default ResOwnerPanel;
