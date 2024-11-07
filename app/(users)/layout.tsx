import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import React from 'react'

const UsersRoutesLayout = async({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Header/>
    <Layout>
        {children}
        </Layout>
        <Footer/>
        </>
  )
}

export default UsersRoutesLayout