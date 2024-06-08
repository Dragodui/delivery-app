import React, { useEffect } from 'react';
import Input from './UI/Input';
import { useState } from 'react';
import Button from './UI/Button';
import axios from 'axios';
import { baseUrl } from '../config';

const EditProductModal = ({ productId, isVisible, setIsVisible, setIsEdit, isEdit }) => {
  const [row, setRow] = useState({
    id: Date.now(),
    name: '',
    description: '',
    price: 0,
    image: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products/${productId}`);
        const product = response.data;
        setRow(product);
      } catch (error) {
        console.log(`Error while fetching product ${error}`);
      }
    };
    fetchProduct();
  }, []);

  const handleInputChange = (id, field, value) => {
    setRow({ ...row, [field]: value });
  };

  const editProduct = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/products/edit/${productId}`,
        row,
      );
      setIsEdit(!isEdit);
      setIsVisible(false);
    } catch (error) {
      console.log(`Error while editing product ${error}`);
    }
  };

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={`fixed flex items-center justify-center top-0 left-0 px-3 right-0 bottom-0 bg-[#0000004d]`}
    >
      <form
        className='bg-white px-10 flex flex-col w-full gap-4 max-w-[800px] py-8 rounded-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='table-container table-class w-full'>
          <table className='w-full table'>
            <thead>
              <tr>
                <th className='text-left'>Name</th>
                <th className='text-left'>Description</th>
                <th className='text-left'>Price</th>
                <th className='text-left'>Image Link</th>
              </tr>
            </thead>
            <tbody>
              <tr key={row.id}>
                <td>
                  <Input
                    type='text'
                    placeholder='Name'
                    value={row.name}
                    onChange={(e) =>
                      handleInputChange(row.id, 'name', e.target.value)
                    }
                  />
                </td>
                <td>
                  <Input
                    type='text'
                    placeholder='Description'
                    value={row.description}
                    onChange={(e) =>
                      handleInputChange(row.id, 'description', e.target.value)
                    }
                  />
                </td>
                <td>
                  <Input
                    type='number'
                    min='0'
                    placeholder='Price'
                    value={row.price}
                    onChange={(e) =>
                      handleInputChange(
                        row.id,
                        'price',
                        parseFloat(e.target.value),
                      )
                    }
                  />
                </td>
                <td>
                  <Input
                    type='text'
                    placeholder='Image link'
                    value={row.image}
                    onChange={(e) => {
                      console.log(e.target.value);
                      handleInputChange(row.id, 'image', e.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Button onClick={editProduct}>Save Changes</Button>
      </form>
    </div>
  );
};

export default EditProductModal;
