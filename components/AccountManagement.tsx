/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useSession} from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut, User2Icon, Shield } from "lucide-react";
import Container from "./ui/container";
import axios from "axios";
import ProfileSetting from "./ProfileSetting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
export type UserType = {
  name: string | null;
  id: string;
  email: true;
  image: {
    url: string;
  } | null;
  accounts: {
    id: string;
    provider: string;
  }[];
} | null;
const AccountManagement = () => {
  const session = useSession();
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    async function fetchUser() {
      axios.get(`/api/users/${session.data?.user.id}`).then((res) => {
        setUser(res.data.user);
      });
    }
    fetchUser();
  }, [session.data?.user.id]);
  return (
    <Container>
      <motion.div
        className="relative w-full mx-auto lg:flex flex-shrink-0 bg-white-50 min-h-screen dark:bg-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sidebar */}
        <div className="w-full bg-white dark:text-black p-2 dark:bg-black">
          <h2 className="text-2xl font-bold mb-6 text-center text-yellow-200 text-wrap">
            Account Management
          </h2>
          <div>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="flex justify-between w-full">
                <div>
                  <TabsTrigger value="profile">
                    <User2Icon name="user" className="mr-2" />
                    <span>Profile</span>
                  </TabsTrigger>
                </div>
                <div className="mb-4 flex items-center cursor-pointer hover:text-yellow-300">
                  <TabsTrigger value="security">
                    <Shield name="shield" className="mr-2" />
                    <span>Security</span>
                  </TabsTrigger>
                </div>
                <div className="mb-4 cursor-pointer hover:text-yellow-300">
                  <TabsTrigger value="signOut">
                    <LogOut name="shield" className="mr-2" />
                    <span>Log Out</span>
                  </TabsTrigger>
                </div>
              </TabsList>
              <TabsContent value="profile">
                <ProfileSetting user={user} />
              </TabsContent>
              <TabsContent value="security">Security</TabsContent>
              <TabsContent value="signOut">Sign Out</TabsContent>
            </Tabs>
          </div>
          {/* Additional sections like subscriptions or payment settings */}
        </div>
      </motion.div>
    </Container>
  );
};

export default AccountManagement;
