import React, { useEffect } from 'react';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { IconContext } from 'react-icons';

const OrderNotificationModal = ({isVisible, setIsVisible}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <div
      className={
        'fixed top-[10px] right-[10px] bg-white shadow-2xl rounded-xl w-[300px] text-center flex flex-col p-4 items-center'
      }
    >
      <IconContext.Provider
                  value={{ style: { width: '60px', height: '60px' } }}
                >
                  <div>
                  <IoCheckmarkDoneSharp />
                  </div>
                </IconContext.Provider>
      <p className='font-medium text-xl'>
        Your order has been successfully placed
      </p>
    </div>
  );
};

export default OrderNotificationModal;
