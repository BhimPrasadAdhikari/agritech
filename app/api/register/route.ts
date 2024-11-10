import prismadb from '@/lib/prismadb';
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';

export async function POST(
    req:Request,

) {
    try{const body = await req.json(); 
    const {
        name,
        email,
        password
    } = body;
    if(!email || !name || !password){
        return new NextResponse('Missing Info',{status:400})
    }
    const hashedPassword = await bcrypt.hash(password,12);
    const user = await prismadb.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    })
    return NextResponse.json(user)}catch(error:unknown){
        console.log("REGISTRATION_ERROR",error)
        return new NextResponse('Internal Error', {status:500})
    }
}