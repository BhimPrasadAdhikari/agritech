import DasktopSidebar from '@/components/DasktopSidebar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const UsersLayout = async({children}:{children:React.ReactNode}) => {
  return (
    <div className='h-full'>
        <Sidebar/>
        <DasktopSidebar/>
        {children}</div>
  )
}

export default UsersLayout