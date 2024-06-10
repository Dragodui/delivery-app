import React from 'react';
import Input from '../UI/Input';
import { useState } from 'react';
import Button from '../UI/Button';
import axios from 'axios';
import { baseUrl } from '../../config';
import { MdDeleteOutline } from 'react-icons/md';

const AddMenuItemsModal = ({ res, isVisible, setIsVisible }) => {
  const [rows, setRows] = useState([
    { id: Date.now(), name: '', description: '', price: null, image: '' },
  ]);
  console.log(rows);

  const addRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), name: '', description: '', price: null, image: '' },
    ]);
  };

  const handleInputChange = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const addNewItems = async () => {
    try {
      const menuItems = rows.map((row) => ({
        name: row.name,
        description: row.description,
        price: row.price,
        image: row.image,
        restaurantId: res._id,
      }));

      console.log(menuItems);

      const response = await axios.post(`${baseUrl}/restaurantsMenu`, {
        resId: res._id,
        menuItems,
      });
      console.log('Menu items added successfully:', response.data);
      setIsVisible(false);
    } catch (error) {
      console.error('Error adding menu items:', error);
    }
  };

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={`fixed flex items-center justify-center top-0 left-0 px-3 right-0 bottom-0 bg-[#0000004d]`}
    >
      <form
        className='bg-modalBg px-10 flex flex-col border-2 border-text w-full gap-4 max-w-[800px] py-8 rounded-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='table-container table-class w-full font-body'>
          <h1 className='text-3xl font-heading mb-[30px]'>Add new products</h1>
          <table className='w-full table'>
            <thead>
              <tr className='font-heading'>
                <th className='text-left'>Name</th>
                <th className='text-left'>Description</th>
                <th className='text-left'>Price</th>
                <th className='text-left'>Image Link</th>
                <th className='text-left'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
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
                  <td>
                    <Button
                      onClick={() => deleteRow(row.id)}
                      addStyles={'bg-red-500'}
                    >
                      <MdDeleteOutline />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button type='button' onClick={addRow}>
          Add Row
        </Button>
        <Button onClick={addNewItems}>Save Changes</Button>
      </form>
    </div>
  );
};

export default AddMenuItemsModal;
