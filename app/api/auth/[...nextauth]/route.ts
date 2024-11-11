import NextAuth from "next-auth";
import { authOptions } from "@/authOptions";
import { NextApiRequest, NextApiResponse } from "next";

// Handle GET requests
export async function GET(req:NextApiRequest,res:NextApiResponse) {
  return NextAuth(req,res,authOptions);
}

// Handle POST requests
export async function POST(req:NextApiRequest,res:NextApiResponse) {
    return NextAuth(req,res,authOptions);
}
