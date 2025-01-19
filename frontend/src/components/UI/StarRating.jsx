import { IconContext } from 'react-icons';

import { FaStar } from 'react-icons/fa';

const StarRating = ({ rate }) => {
  const stars = Array.from({ length: rate }, (_, index) => (
    <IconContext.Provider value={{ style: { color: '#f1c232' } }}>
      <div>
        <FaStar key={index} />
      </div>
    </IconContext.Provider>
  ));
  return <div className="flex">{stars}</div>;
};

export default StarRating;
