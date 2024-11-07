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
  
import { ProductColumn } from './columns'
import { Button } from '@/components/ui/Button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import { useParams,useRouter } from 'next/navigation';
import { AlertModel } from '@/components/models/alert-model'
interface CellActionProps{
    data: ProductColumn;
}
const CellAction: React.FC<CellActionProps> = ({data}) => {
    const router=useRouter();
    const params=useParams();
    const [loading,setLoading]=useState(false);
    const [open,setOpen]=useState(false)
    const onDelete=async()=>{
        setLoading(true)
        try{
            await axios.delete(`/api/products/${data.id}`)
            router.refresh();
            toast.success('Product deleted')
            
    }catch(error){
        console.error("PRODUCT_DELETE",error)
        toast.error("Something went wrong")

    }finally{
        setLoading(false)
        setOpen(false)
    }}
  const onCopy=(id:string)=>{
    navigator.clipboard.writeText(id);
    toast.success("Product id copied to the clipboard")

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
        <DropdownMenuContent>
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>onCopy(data.id)}>
               <Copy/>
               Copy Id
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={()=>router.push(`/products/${data.id}`)}>
               <Edit/>
               Edit
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={()=>setOpen(true)} className='text-red-500'>
               <Trash/>
               Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  </>)
}

export default CellAction