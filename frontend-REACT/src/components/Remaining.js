import React from 'react';

const Remaining = ({ current }) => {
  return (
    <div className='remaining bg-gray-500 shadow-md p-4 rounded-lg my-2 flex justify-between items-center border border-gray-600'>
      <span className='text-white font-bold'>Current Balance</span>
      <span className='text-white font-bold'>${current}</span>
      <span className='text-white'>
  </span>
</div>
  );
};

export default Remaining;