import React from 'react';
import './index.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Balance from './components/Balance';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import AddBalance from './components/AddBalance';


function App() {
  const [expList, setExpList] = useState([]);
  const [expTotal, setExpenseTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  // const [showAddBalance, setShowAddBalance] = useState(true);
  let [current, setCurrent] = useState(0);

  const addExpense = (expense) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newExp = { id, ...expense};
    setExpList(prevExpList => [...prevExpList, newExp]);
    setExpenseTotal(prevTotal => prevTotal + parseInt(newExp.amount));
  };

  const addBalance = ({ balance }) => {
    const newBalance = prevBalance => prevBalance + parseInt(balance);
    setBalance(newBalance);
    console.log(newBalance);
  };

  if (balance > expTotal) {
    current = balance - expTotal;
  } else if (balance < expTotal) {
    alert("Not enough Balance");
  }

  const deleteExpense = (id) => {
    setExpList(prevExpList => prevExpList.filter(expense => expense.id !== id));
    setExpenseTotal(prevTotal => prevTotal - parseInt(expList.find(expense => expense.id === id).amount));
    if (balance < expTotal) {
      setBalance(prevBalance => prevBalance + parseInt(expList.find(expense => expense.id === id).amount));
    }
    if (current > parseInt(expList.find(expense => expense.id === id).amount)) {
      setCurrent(prevCurrent => prevCurrent - parseInt(expList.find(expense => expense.id === id).amount));
    }
  };

  return (
    <>
    <Router>
        <div className="App min-h-screen flex flex-col justify-center items-center bg-gray-800">
          <Routes>
            <Route path="/" element={<AddBalance onAdd2={addBalance} />} />
            <Route path= "/expense" element={
              <>
              <div className="flex flex-row items-center w-full max-w-6xl">
                <div className="mb-8 mr-2 w-1/3">
                  <Balance balance={balance} />
                </div>
                <div className="mb-8 ml-2 mr-2 w-1/3">
                  <Remaining current={current} />
                </div>
                <div className="mb-8 mr-2 w-1/3">
                  <ExpenseTotal expTotal={expTotal} />
                </div>
              </div>

              <div className="flex flex-col items-center w-full max-w-6xl">
                <div className="mb-8 w-full">
                 <ExpenseList expList={expList} ondelete={deleteExpense} />
                </div>
                <div className="w-full ml-50">
                  <AddExpense onAdd1={addExpense} />
                </div>
              </div>

              </>
            }/>
          </Routes>
        </div>
      </Router>
    </>
    
//     <div className="App min-h-screen flex flex-col justify-center items-center bg-gray-800">
//     {showLogin? (
//       <Login onLogin={handleLogin} />
//       ) : (
//       <>
//         {showAddBalance ? (
//           <AddBalance onAdd2={addBalance} />
//           ) : (
//             <>
//               <div className="flex flex-row items-center w-full max-w-6xl">
//                 <div className="mb-8 mr-2 w-1/3">
//                   <Balance balance={balance} />
//                 </div>
                
//               <div className="mb-8 ml-2 mr-2 w-1/3">
//                 <Remaining current={current} />
//               </div>
//               <div className="mb-8 ml-2 w-1/3">
//                 <ExpenseTotal expTotal={expTotal} />
//               </div>
//               </div>
    
//               <div className="flex flex-col items-center w-full max-w-6xl">
//                 <div className="mb-8 w-full">
//                   <ExpenseList expList={expList} ondelete={deleteExpense} />
//                 </div>
//                 <div className="w-full">
//                   <AddExpense onAdd1={addExpense} />
//                 </div>
//               </div>
//             </>
//           )
//         }
//       </>
//     )
//   }
// </div>
  );
}

export default App;
