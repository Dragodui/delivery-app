import React, { useEffect, useState } from 'react';
import Wrapper from '../components/UI/Wrapper';
import Loader from '../components/UI/Loader';
import { useAppSelector } from '../store/store';
import Button from '../components/UI/Button';
import axios from 'axios';
import { baseUrl } from '../config';
import ListOfItems from '../components/ListOfItems';
import AddMenuItemsModal from '../components/Modals/AddMenuItemsModal';
import { FaLocationDot } from 'react-icons/fa6';
import { RiProfileFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';

const ResOwnerPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const user = useAppSelector((state) => state.user.user);
  const [res, setRes] = useState(null);
  const [menu, setMenu] = useState([]);
  const { resId } = useParams();

  const fetchRes = async () => {
    try {
      const response = await axios.get(`${baseUrl}/restaurant/${resId}`);
      console.log(response.data);
      setRes(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${baseUrl}/restaurantsMenu/${resId}`);
      setMenu(response.data);
    } catch (error) {
      console.error('Error getting menu items:', error);
    }
  };

  useEffect(() => {
    fetchRes();
    fetchMenu();
  }, []);

  useEffect(() => {
    fetchRes();
  }, [user]);

  useEffect(() => {
    fetchMenu();
  }, [isEdit]);

  useEffect(() => {
    fetchMenu();
  }, [res, isAddItemModalVisible]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className='text-4xl font-heading font-bold mt-[40px]'>
            Your restaurant
          </h1>
          <div className='flex font-body font-normal flex-col border-2 border-text px-4 py-3 rounded-[20px] mt-[20px]'>
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
              <img
                className='max-w-[150px] rounded-2xl'
                src={res.image}
                alt=''
              />
            </div>
            <div className='mt-5 border-2 border-text p-4 rounded-2xl'>
              <div className='flex justify-between'>
                <h2 className='flex text-2xl items-center font-bold gap-3 font-heading'>
                  Menu
                </h2>
                <Button onClick={() => setIsAddItemModalVisible(true)}>
                  Add new item
                </Button>
              </div>
              <ListOfItems
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                isEditable={true}
                isAddableToCard={false}
                list={menu}
              />
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
