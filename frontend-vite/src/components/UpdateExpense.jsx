import React, { useEffect } from 'react'
import { useState } from 'react'
import { Dialog, DialogHeader, DialogFooter, DialogDescription, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Edit2, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setExpenses,setSingleExpense } from '../redux/expenseSlice'


const UpdateExpense = ({expense}) => {
    const {expenses,singleExpense} = useSelector(store => store.expense);
    const [formData, setFormData] = useState({
        description: singleExpense?.description,
        amount: singleExpense?.amount,
        category: singleExpense?.category
    });

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setFormData({
            description: singleExpense?.description,
            amount: singleExpense?.amount,
            category: singleExpense?.category
        });
    }, [singleExpense]);

    const changeEventHandler = (e) => {
        const {name,value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const changeCategoryHandler = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            category: value
        }))
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log(formData);
        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:3000/api/v1/expense/update/${expense._id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            });
            if(res.data.success) {
                const updatedExpenses = expenses.map(exp => exp._id === expense._id ? res.data.expense : exp);
                dispatch(setExpenses(updatedExpenses));
                toast.success(res.data.message);
                setIsOpen(false);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button 
            className="rounded-full border border-black hover:border-transparent"
            size="icon" 
            onClick={()=>{
                dispatch(setSingleExpense(expense));
                setIsOpen(true);
            }} 
            variant="outline">
                <Edit2/>
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit Expense</DialogTitle>
                <DialogDescription>
                    Edit the expense details below
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                    Description
                </Label>
                <Input
                id="description"
                className="col-span-3"
                name="description"
                value={formData.description}
                onChange={changeEventHandler}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                    Amount
                </Label>
                <Input
                id="amount"
                className="col-span-3"
                name="amount"
                value={formData.amount}
                onChange={changeEventHandler}
                />
            </div>
            <Select value={formData.category} onValueChange={changeCategoryHandler}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            </div>
            <DialogFooter>
                {
                    loading ? <Button className='w-full my-4'>
                        <Loader2 className='mr-2 h-4 animate-spin'/>
                        Please wait
                    </Button> : 
                    <Button type="submit">Save changes</Button>
                }
            </DialogFooter>
            </form>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default UpdateExpense