import React from 'react';

const ExpenseTotal = ({ expTotal }) => {
  return (
    <div className='remaining bg-gray-500 shadow-md p-4 rounded-lg my-2 flex justify-between items-center border border-gray-600'>
      <span className='text-white font-bold'>Total Expense</span>
      <span className='text-white font-bold'>${expTotal}</span>
      <span className='text-white'>
  </span>
</div>
  );
};

export default ExpenseTotal;