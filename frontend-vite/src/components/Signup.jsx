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

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/register", input, {
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
        }
    };

  return (
    <div className='flex items-center justify-center flex-col w-scren h-screen'>
        <form onSubmit={submitHandler} className='w-96 p-8 shadow-lg'>
            <div className='w-full flex justify-center mb-5'>
                <Logo />
            </div>
            <div>
                <Label>Full Name</Label>
                <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeHandler}
                />
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
            <Button type="submit" className="w-full my-5">Signup</Button>
            <p className='text-center text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
        </form>
    </div>
  )
}

export default Signup