import React, {useState} from 'react';
import Input from './UI/Input';

const AddResModal = ({isVisible, setIsVisible}) => {

    const [resInfo, setResInfo] = useState({
        name: '',
        description: '',
        address: '',
        image: '',
        ownerId: '',
    })

  return (
    <div onClick={() => setIsVisible(false)} className={`fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-[#0000004d]`}>
      <form className='bg-white px-10 flex flex-col w-full gap-4 max-w-[600px] py-8 rounded-xl' onClick={e => e.stopPropagation()}>
        <h1 className='text-2xl font-bold'>Register new restaurant</h1>
        <Input type="text" placeholder="Name"/>
        <Input type="text" placeholder="Address"/>
        <textarea className='focus:outline-none w-full py-2 border-b-2 border-b-black' type="text" placeholder="Description"/>
        <input type="file" accept="image/*"/>
      </form>
    </div>
  );
};

export default AddResModal;
