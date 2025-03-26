import React,{ useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddBalance = ({onAdd2}) => {
    const [balance, setBalance] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e) => {
      e.preventDefault()
      if(!balance){
          alert('Please add Balance Amount');
          return
      }
        onAdd2({balance});
        navigate('/expense');
        setBalance('');
      }

      return (
        <>
          <form onSubmit={onSubmit} className="flex flex-col items-center">
            <div className="rounded-lg add-balance">
              <div className="mb-8">
                <label className="text-3xl text-white">Balance</label>
              </div>
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Add Balance Amount"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-white bg-opacity-30 focus:bg-opacity-100 focus:outline-none placeholder-gray-400 sm:w-64 mt-2"
                />
              </div>
              <div>
                <button
                  className="bg-indigo-700 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </>
      );
}

export default AddBalance