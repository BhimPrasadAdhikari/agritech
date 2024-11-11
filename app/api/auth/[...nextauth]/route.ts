import { authOptions } from "@/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export const {GET, POST}= handler;
