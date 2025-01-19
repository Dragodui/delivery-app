import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '../UI/Button';
import axios from 'axios';
import { baseUrl } from '../../config';
import { log } from '../../utils';

const DeleteProductModal = ({
  productId,
  isVisible,
  setIsVisible,
  isEdit,
  setIsEdit,
}) => {
  const [productName, setProductName] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products/${productId}`);
        await log(response);
        const product = response.data;
        setProductName(product.name);
        await log(response);
      } catch (error) {
        console.log(`Error while fetching product ${error}`);
      }
    };
    fetchProduct();
  }, []);

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}/products/delete/${productId}`,
      );
      await log(response);
      setIsEdit(!isEdit);
      setIsVisible(false);
    } catch (error) {
      console.log(`Error while editing product ${error}`);
    }
  };

  return (
    <div
      onClick={e => {
        setIsVisible(false);
        e.preventDefault();
      }}
      className={`fixed flex items-center justify-center top-0 left-0 px-3 right-0 bottom-0 bg-[#0000004d]`}
    >
      <form
        className='bg-textWhite px-10 border-2 border-text flex flex-col w-full gap-4 max-w-[800px] py-8 rounded-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <p className='text-center font-bold text-2xl font-medium font-heading'>
          You sure you wanna delete {productName}?
        </p>
        <Button addStyles={'bg-red-500'} onClick={deleteProduct}>
          Delete
        </Button>
      </form>
    </div>
  );
};

export default DeleteProductModal;
