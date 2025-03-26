import React from 'react'
import { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import Logo from './shared/Logo'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/authSlice'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/login", input, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            console.log(res);
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
                
            }
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='flex items-center justify-center flex-col w-scren h-screen'>
        <form onSubmit={submitHandler} className='w-96 p-8 shadow-lg'>
            <div className='w-full flex justify-center mb-5'>
                <Logo />
            </div>
            <div>
                <Label>Email</Label>
                <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeHandler}
                />
            </div>
            <div>
                <Label>Password</Label>
                <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeHandler}
                />
            </div>
            <Button type="submit" className="w-full my-5">Login</Button>
            <p className='text-center text-sm'>Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link></p>
        </form>
    </div>
  )
}

export default Login