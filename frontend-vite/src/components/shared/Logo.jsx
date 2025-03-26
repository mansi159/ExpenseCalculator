import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/'>
        <img className='w-16 h-12' src="./src/assets/expense-tracker.png" alt='logo'/>
    </Link>
  )
}

export default Logo