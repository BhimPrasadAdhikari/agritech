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
  
import { BillboardColumn } from './columns'
import { Button } from '@/components/ui/Button';
import { Copy, Edit, MoreHorizontal,Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import {useRouter } from 'next/navigation';
import { AlertModel } from '@/components/models/alert-model'
interface CellActionProps{
    data: BillboardColumn;
}
const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router=useRouter();
    const [loading,setLoading]=useState(false);
    const [open,setOpen]=useState(false)
    const onDelete=async()=>{
        setLoading(true)
        try{
            await axios.delete(`/api/billboards/${data.id}`)
            router.refresh();
            toast.success('Billboard deleted')
            
    }catch(error){
        console.error('Error DELETE req',error)
        toast.error("Make sure you deleted all the categories using this billboard")

    }finally{
        setLoading(false)
        setOpen(false)
    }}
  const onCopy=(id:string)=>{
    navigator.clipboard.writeText(id);
    toast.success("Billboard id copied to the clipboard")

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
        <DropdownMenuContent className='z-30 bg-white dark:bg-black '>
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>onCopy(data.id)} className="hover:cursor-pointer">
               <Copy/>
               Copy Id
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={()=>router.push(`/admin/billboards/${data.id}`)} className="hover:cursor-pointer">
               <Edit/>
               Edit
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={()=>setOpen(true)} className="text-red-500 hover:cursor-pointer">
               <Trash/>
               Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  </>)
}

export default CellAction