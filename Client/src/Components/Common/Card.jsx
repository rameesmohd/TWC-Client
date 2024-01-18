import React from 'react';

const Card = ({ text }) => {
  return (
    <div className="border py-1 px-2 bg-blue-200 mx-1 text-center rounded-xl my-1">
      {text}
    </div>
  );
};

export default Card;