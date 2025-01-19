import React, { useState } from 'react';

const OwnerRegistration = ({ resInfo, setResInfo }) => {
  const [image, setImage] = useState('');
  return (
    <div className="flex flex-col gap-4">
      <input
        value={resInfo.resName}
        onChange={(e) =>
          setResInfo({
            ...resInfo,
            resName: e.target.value,
          })
        }
        className="focus:outline-none py-2 border-b-2 border-b-black"
        type="text"
        placeholder="Restaurant Name"
      />
      <input
        value={resInfo.resAddress}
        onChange={(e) =>
          setResInfo({
            ...resInfo,
            resAddress: e.target.value,
          })
        }
        className="focus:outline-none py-2 border-b-2 border-b-black"
        type="text"
        placeholder="Restaurant address"
      />
      <textarea
        value={resInfo.resDescription}
        onChange={(e) =>
          setResInfo({
            ...resInfo,
            resDescription: e.target.value,
          })
        }
        className="focus:outline-none py-2 border-b-2 border-b-black"
        type="text"
        placeholder="Restaurant address"
      />
      <img src={image} alt="" />
      <div>
        <p className="text-black font-medium ">Logo of restaurant</p>
        <input
          value={resInfo.resImage}
          onChange={(e) => {
            setResInfo({
              ...resInfo,
              resImage: e.target.value,
            });
            setImage(e.target.files[0]);
          }}
          className="focus:outline-none py-2"
          type="file"
          accept="image/*"
          placeholder="Restaurant address"
        />
      </div>
    </div>
  );
};

export default OwnerRegistration;
