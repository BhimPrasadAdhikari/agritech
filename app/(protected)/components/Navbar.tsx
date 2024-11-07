import React from 'react'
import { MainNav } from './MainNav';
const Navbar = async () => {
 
  return (
    <div className='border-b'>
    <div className='flex items-center h-16 px-4'>
        <MainNav className='mx-6'/>
    </div>
    </div>

  )
}

export default Navbar
