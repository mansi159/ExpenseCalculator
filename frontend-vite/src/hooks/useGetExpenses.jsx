import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setExpenses } from '@/redux/expenseSlice';
import axios from 'axios';


const useGetExpenses = () => {
    const dispatch = useDispatch();
    const {category, markAsDone} = useSelector(store => store.expense);

    useEffect(() => {
        console.log("Fetching expenses...");
        const fetchExpense = async () => {
            try {
                axios.defaults.withCredentials=true;
                const res = await axios.get(`http://localhost:3000/api/v1/expense/getall?category=${category}&done=${markAsDone}`);
                if(res.data.success){
                    console.log("Dispatching setExpenses with:", res.data.expenses);
                    dispatch(setExpenses(res.data.expenses));
                } else {
                    console.error("API Fetch Error:", error);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchExpense();
    },[dispatch, category, markAsDone]);
}

export default useGetExpenses;