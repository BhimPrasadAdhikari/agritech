"use client"
import axios from 'axios'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { CategoryColumn } from './columns'
import { Button } from '@/components/ui/Button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import {useRouter } from 'next/navigation';
import { AlertModel } from '@/components/models/alert-model'
interface CellActionProps{
    data: CategoryColumn;
}
const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router=useRouter();
    const [loading,setLoading]=useState(false);
    const [open,setOpen]=useState(false)
    const onDelete=async()=>{
        setLoading(true)
        try{
            await axios.delete(`/api/categories/${data.id}`)
            router.refresh();
            toast.success('Category deleted')
            
    }catch(error){
        console.error("CATEGORY_DELETE",error)
        toast.error("Something went wrong")

    }finally{
        setLoading(false)
        setOpen(false)
        router.refresh();
    }}
  const onCopy=(id:string)=>{
    navigator.clipboard.writeText(id);
    toast.success("category id copied to the clipboard")

  }
  
    return (
    <>
    <AlertModel isOpen={open} loading={loading} 
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}/>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
<Button>
    <span className='sr-only'>
        Open Menu
    </span>
    <MoreHorizontal/>
</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white dark:bg-black'>
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>onCopy(data.id)} className='hover:cursor-pointer'>
               <Copy/>
               Copy Id
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={()=>router.push(`/admin/categories/${data.id}`)} className='hover:cursor-pointer'>
               <Edit/>
               Edit
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={()=>setOpen(true)} className='hover:cursor-pointer text-red-500'>
               <Trash/>
               Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  </>)
}

export default CellAction