import React from 'react';
import Item from './Item';

const ListOfItems = ({
  list,
  isAddableToCard,
  addStyles,
  isEditable,
  setIsEdit,
  isEdit,
  handleQuantityChange,
  isInCartPage,
}) => {
  return (
    <div className={`flex flex-wrap gap-4 items-center ${addStyles}`}>
      {list.length ? (
        list.map((item) => {
          return (
            <Item
              isEditable={isEditable}
              isAddableToCard={isAddableToCard}
              setIsEdit={setIsEdit}
              item={item}
              isEdit={isEdit}
              key={item._id}
              handleQuantityChange={handleQuantityChange}
              isInCartPage={isInCartPage}
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
