import { useState } from 'react'
import './App.css'
import { Toaster } from "@/components/ui/sonner"
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {

  const appRouter = createBrowserRouter([
    {
    path: '/',
    element: <Home />
    },
    {
    path: '/login',
    element: <Login />
    },
    {
    path: '/signup',
    element: <Signup />
    }
  ])

  return (
    <>
      <div>
        <div>
          <RouterProvider router = {appRouter}></RouterProvider>
          <Toaster/>
        </div>
      </div>
    </>
  )
}

export default App
