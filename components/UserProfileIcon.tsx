"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useAccountManagementModel from "@/hooks/use-AccountManagement-model";
import { useEffect, useState } from "react";
import axios from "axios";

const UserProfileIcon = () => {
  const { data: session } = useSession();
  const  [url,setUrl] = useState<string>('')
  const AccountManagementModel = useAccountManagementModel();

  const handleProfileClick = () => {
    AccountManagementModel.onOpen();
  };
  useEffect(()=>{
    async function fetchUser() {
      try{
     await axios.get(`/api/users/${session?.user.id}`).then(res=>{
        if (res.data.success){
          if(res.data.user.image){
        setUrl(res.data.user.image.url)}}}
      )}catch(error){
        console.log(error)
      }
    }
    fetchUser()
  },[session?.user.id])
  return (
    <div
      className="relative inline-block cursor-pointer w-8 h-8"
      onClick={handleProfileClick}
    >
      {session?.user?.image || url ? (
        <Image
          src={url}
          alt="User Profile"
          fill
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white">
          {session?.user?.name?.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default UserProfileIcon;
