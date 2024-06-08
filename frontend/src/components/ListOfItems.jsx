import React from 'react';
import Item from './Item';

const ListOfItems = ({ list, isAddableToCard, addStyles }) => {
  return (
    <div className={`flex flex-wrap gap-4 items-center ${addStyles}`}>
      {list.length ? (
        list.map((item) => {
          return (
            <Item
              isAddableToCard={isAddableToCard}
              item={item}
              key={item._id}
            />
          );
        })
      ) : (
        <p className='text-center mt-[30px] text-gray-500 text-xl font-medium'>
          You don`t have any items here
        </p>
      )}
    </div>
  );
};

export default ListOfItems;
