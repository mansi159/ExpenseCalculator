import { useState } from "react";
import React from "react";

const AddExpense = ({onAdd1}) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        if(!name || !amount){
            alert('Please enter proper name and amount for your expense');
            return
        }
        onAdd1({name, amount});
        setName('');
        setAmount('');
      }

  return (
    <>
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row rounded-lg add-expense w-full max-w-md ml-32">
      <div className="form-control mb-4 mr-4 sm:mb-0 sm:w-full">
        <label className="text-white font-bold">Name</label>
    <input
      type="text"
      placeholder="Add Expense Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 rounded bg-white bg-opacity-30 focus:bg-opacity-100 focus:outline-none placeholder-gray-400 sm:w-64 mt-2"
    />
  </div>
  <div className="form-control mb-4 mr-4 sm:mb-0 sm:w-full">
        <label className="text-white  font-bold">Amount</label>
    <input
      type="text"
      placeholder="Add Expense Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="w-full px-4 py-2 rounded bg-white bg-opacity-30 focus:bg-opacity-100 focus:outline-none placeholder-gray-400 sm:w-64 mt-2"
    />
  </div>
  <button
    type="submit"
    className="bg-indigo-700 hover:bg-blue-500 text-white font-bold py-1 px-6 rounded transition-colors duration-300 ease-in-out min-h-0 mt-6 ml-2 mr-2"
  >
    Save
  </button>
</form>
    </>
  )
}

export default AddExpense