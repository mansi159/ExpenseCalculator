import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/endpoints'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const Login = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    // api integration
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
           dispatch(setLoading(true)); 
            const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            console.log(res);
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false)); 
        }
    }

  return (
    <>
    <form onSubmit={submitHandler} className="flex flex-col sm:flex-row rounded-lg add-expense w-full max-w-md ml-32">
        <div className="form-control mb-4 mr-4 sm:mb-0 sm:w-full">
            <label className="text-white font-bold">Name</label>
                <input
                type="text"
                placeholder="Enter Fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 rounded bg-white bg-opacity-30 focus:bg-opacity-100 focus:outline-none placeholder-gray-400 sm:w-64 mt-2"
                />
        </div>
        <div className="form-control mb-4 mr-4 sm:mb-0 sm:w-full">
            <label className="text-white font-bold">Email</label>
                <input
                type="text"
                placeholder="Enter Email"
                value={input.email}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 rounded bg-white bg-opacity-30 focus:bg-opacity-100 focus:outline-none placeholder-gray-400 sm:w-64 mt-2"
                />
        </div>
        <div className="form-control mb-4 mr-4 sm:mb-0 sm:w-full">
            <label className="text-white  font-bold">Password</label>
                <input
                type="text"
                placeholder="Enter Password"
                value={input.password}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 rounded bg-white bg-opacity-30 focus:bg-opacity-100 focus:outline-none placeholder-gray-400 sm:w-64 mt-2"
                />
        </div>
        {
            loading ? (
                <button
                type="button"
                className="bg-indigo-700 hover:bg-blue-500 text-white font-bold py-1 px-6 rounded transition-colors duration-300 ease-in-out flex items-center justify-center w-full my-4"
                >
                <svg
                className="mr-2 h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                >
                <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                ></circle>
                <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                ></path>
                </svg>
                Please wait
                </button>
                    ) : (
                    <button
                    type="submit"
                    className="bg-indigo-700 hover:bg-blue-500 text-white font-bold py-1 px-6 rounded transition-colors duration-300 ease-in-out min-h-0 mt-6 ml-2 mr-2"
                    >
                    Sign Up
                    </button>
                    )
                }
            <button
            className="bg-indigo-700 hover:bg-blue-500 text-white font-bold py-1 px-6 rounded transition-colors duration-300 ease-in-out min-h-0 mt-6 ml-2 mr-2"
            >
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
            </button>
    </form>
    </>
  )
}

export default Signup