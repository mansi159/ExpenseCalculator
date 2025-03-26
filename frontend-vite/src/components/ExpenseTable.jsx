import React from 'react'
import { useState,useEffect } from 'react'
import { Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow } from './ui/table'
import { useSelector } from 'react-redux'
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import UpdateExpense from './UpdateExpense';
import axios from 'axios';
import { toast } from 'sonner';


const ExpenseTable = () => {

  const {expenses} = useSelector(store => store.expense);
  const [tempExpenses, setTempExpenses] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    setTempExpenses(expenses);
  }, [expenses]);

  const totalAmount = tempExpenses.reduce((acc, expense) => {
    if (expense && !checkedItems[expense._id]) {
      return acc + expense.amount;
    }
    return acc;
  }, 0);  

  const removeExpenseHandler = async(id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/expense/remove/${id}`);
      if(res.data.success){
        toast.success(res.data.message);
        setTempExpenses(tempExpenses.filter(expense => expense._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckboxChange = async(id) => {
    const newStatus = !checkedItems[id];
    try {
      const res = await axios.put(`http://localhost:3000/api/v1/expense/${id}/done`, {done: newStatus},{
        headers: {
          'Content-Type': 'application/json'
        }, withCredentials: true
      });
      if(res.data.success){
        toast.success(res.data.message);
        setCheckedItems((prevData) => ({
          ...prevData,
          [id]: newStatus
        }));
        setTempExpenses(tempExpenses.map(expense => expense._id === id? {...expense, done: newStatus} : expense));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Mark as Done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tempExpenses.length === 0 ? 
          (
            <TableRow>
              <TableCell colSpan={6} className="text-center">Add your first expense</TableCell>
            </TableRow>
          )
         : tempExpenses?.map((expense) => (
          <TableRow key={expense._id}>
            <TableCell className="font-medium">
              <Checkbox
              checked={expense?.done}
              onCheckedChange={() => handleCheckboxChange(expense._id)}
              />
            </TableCell>
            <TableCell className={`${expense?.done ? 'line-through' : ''}`}>{expense?.description}</TableCell>
            <TableCell className={`${expense?.done ? 'line-through' : ''}`}>{expense?.amount}</TableCell>
            <TableCell className={`${expense?.done ? 'line-through' : ''}`}>{expense?.category}</TableCell>
            <TableCell className={`${expense?.done ? 'line-through' : ''}`}>{expense?.createdAt?.split("T")[0]}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button 
                onClick={() => removeExpenseHandler(expense._id)}
                size="icon" 
                className="rounded-full border border-red-500 hover:border-transparent" 
                variant="outline">
                  <Trash className="h-4 w-4"/>
                </Button>
                {/* <Button size="icon" className="rounded-full border border-black hover:border-transparent" variant="outline"><Edit2 className="h-4 w-4"/></Button> */}
                <UpdateExpense expense={expense}/>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-bold text-xl">Total</TableCell>
          <TableCell className="text-right font-bold text-xl">₹{totalAmount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}

export default ExpenseTable