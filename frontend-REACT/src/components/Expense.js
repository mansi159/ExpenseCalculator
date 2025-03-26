import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Expense = ({ expense, ondelete }) => {
  return (
    <li className="bg-gray-500 shadow-md p-4 rounded-lg my-2 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-white">{expense.name}</h2>
        <p className="text-white">{expense.amount}</p>
      </div>
      <FaTimes
        className="cursor-pointer"
        style={{ color: 'red' }}
        onClick={() => ondelete(expense.id)}
      />
    </li>
  );
};

export default Expense;