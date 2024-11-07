/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LogOut,
  User2Icon,
  Shield,
  Trash2Icon,
} from "lucide-react"; // Icons from Lucide React
import { Button } from "./ui/Button";
import Container from "./ui/container";
import axios from "axios";
import { Account, User } from "@prisma/client";

const AccountManagement = () => {
  const session = useSession();
  const [name, setName] = useState(session.data?.user.name || "");
  const[user,setUser]=useState<User|null>(null)
  const [image, setImage] = useState(session.data?.user.image || "");
  // Example state for user information, emails, and connected accounts
  const [emails, setEmails] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [connectedAccounts, setConnectedAccounts] = useState<Account[]>([]);
 console.log(user)
  // Placeholder for logged-in device name (you can fetch this from session or implement your own logic)
  // const deviceName ="Google Pixel 5";
  useEffect(() => {
    async function fetchUser() {
      axios.get(`/api/users/${session.data?.user.id}`).then((res) => {
        setEmails(res.data.user.email);
        console.log(res);
        setUser(res.data.user)
        setConnectedAccounts(res.data.user.accounts);
      });
    }
    fetchUser();
  }, [session.data?.user.id]);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Set the image state to the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    // Implement the logic to update the profile in your database or API
    console.log("Updating profile with:", { name, image });
  };

  const handleDeleteAccount = () => {
    // Implement the logic to delete the account (API call)
    console.log("Account deletion requested for:", session.data?.user?.email);
  };
  // Handlers for adding new emails, phone numbers, and connecting accounts
  const addEmail = () => {
    // Logic to add a new email
  };
  const addPhoneNumber = () => {
    // Logic to add a new phone number
  };
  const connectAccount = () => {
    // Logic to connect a new account
  };

  return (
    <Container>
      <motion.div
        className="relative w-full mx-auto lg:flex flex-shrink-0 bg-white-50 min-h-screen dark:bg-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sidebar */}
        <div className="w-1/4 bg-white dark:text-black p-2 dark:bg-black hidden lg:block">
          <h2 className="text-2xl font-bold mb-6 text-center text-yellow-200 text-wrap">
            Account Management
          </h2>
          <div className="mb-4 flex items-center cursor-pointer hover:text-yellow-300">
            <Button>
              <User2Icon name="user" className="mr-2" />
              <span>Profile</span>
            </Button>
          </div>
          <div className="mb-4 flex items-center cursor-pointer hover:text-yellow-300">
            <Button>
              <Shield name="shield" className="mr-2" />
              <span>Security</span>
            </Button>
          </div>
          <div className="mb-4 cursor-pointer hover:text-yellow-300">
            <Button onClick={() => signOut()}>
              <LogOut name="shield" className="mr-2" />
              <span>Log Out</span>
            </Button>
          </div>
          {/* Additional sections like subscriptions or payment settings */}
        </div>
        {/* for small screens and medium */}
        <h2 className="text-2xl font-bold mb-6 text-center text-wrap lg:hidden">
            Account Management
          </h2>
        <div className="border-b-2 flex justify-between lg:hidden  ">
          <div className="mb-4 flex items-center cursor-pointer hover:text-yellow-300">
            <Button>
              <User2Icon name="user" className="mr-1" />
              <span>Profile</span>
            </Button>
          </div>
          <div className="mb-4 flex items-center cursor-pointer hover:text-yellow-300">
            <Button>
              <Shield name="shield" className="mr-1" />
              <span>Security</span>
            </Button>
          </div>
          <div className="mb-4 cursor-pointer hover:text-yellow-300">
            <Button onClick={() => signOut()}>
              <LogOut name="shield" className="mr-1" />
              <span>Log Out</span>
            </Button>
          </div>

        </div>

        {/* Show Area */}
        <div className="w-full p-2">
          {/* Profile Heading */}
          <div className=" p-4 mb-6">
            <h3 className="text-2xl font-semibold">Profile</h3>
          </div>

          {/* Profile Info */}
          <div className="">
            {/* Profile and Image */}
            <div className="bg-white dark:bg-black border-b-2 p-4 rounded-lg grid grid-cols-3 items-center">
              <div>
                <h4 className="text-xl font-semibold w-full">Profile</h4>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full relative mr-2">
                  <Image
                    src={image || "/images/profile.png"}
                    fill
                    alt="Profile"
                    className="rounded-full mr-4 object-cover"
                  />
                </div>
                <span>{name}</span>
              </div>
              <Button className="bg-green-500 text-white dark:text-blackpx-4 py-2 rounded-md hover:bg-green-600">
                Edit Profile
              </Button>
            </div>

            {/* Email Addresses */}
            <div className="bg-white dark:bg-black border-b-2 p-4 rounded-lg grid grid-cols-3 items-center gap-4">
              <h4 className="text-xl font-semibold">Email Addresses</h4>
              <div className="">
                <ul className="mb-4 w-full">
                  {/* {emails.map((email, index) => ( */}
                  {/* <li key={index} className="mb-2 flex justify-between"> */}
                  <span className="text-sm">{emails}</span>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                  {/* </li> */}
                  {/* ))} */}
                </ul>
                <Button
                  className="bg-green-500 text-white dark:text-blackpx-4 py-2 rounded-md hover:bg-green-600"
                  onClick={addEmail}
                >
                  + Add Email Address
                </Button>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="bg-white dark:bg-black border-b-2 p-4 rounded-lg grid grid-cols-3 items-center gap-4">
              <h4 className="text-xl font-semibold mb-2">Phone Numbers</h4>
              <div>
                <ul className="mb-4">
                  {phoneNumbers.map((phone, index) => (
                    <li key={index} className="mb-2 flex justify-between">
                      <span className="text-sm">{phone}</span>
                      <button className="text-red-500 hover:text-red-700 text-sm">
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <Button
                  className="bg-green-500 text-white dark:text-blackpx-4 py-2 rounded-md hover:bg-green-600"
                  onClick={addPhoneNumber}
                >
                  + Add Phone Number
                </Button>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="bg-white dark:bg-black border-b-2 p-4 rounded-lg grid grid-cols-3 items-center gap-4">
              <h4 className="text-xl font-semibold mb-2">Connected Accounts</h4>
              <div>
                <ul className="mb-4">
                  {connectedAccounts.map((account, index) => (
                    <li key={index} className="mb-2 flex justify-between">
                      <span className="text-sm">{account.provider}</span>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <Button
                  className="bg-green-500 text-white dark:text-blackpx-4 py-2 rounded-md hover:bg-green-600"
                  onClick={connectAccount}
                >
                  + Connect Account
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Account Management
        </h2>
        <div>Profile</div>
        <div>Security</div>
      </div>
      {/*ShowArea*/}
        {/* <div>
        <div>Heading</div>
        <div>
          <div>
            <div>profile</div>
            <div>Image name</div>
            <div>Edit Profile</div>
          </div>
          <div>
            <div>Email Addresses</div>
            <div>
              list of email Addresses
              <div> + Add Email address button</div>
            </div>
            <div></div>
          </div>
          <div>
            <div>Phone Number</div>
            <div>
              List of phone numbers
              <div>+ add phone number</div>
            </div>
            <div></div>
          </div>
          <div>
            <div>connected accounts</div>
            <div>All accounts list with provider logo 
              <div>
                +Connect Account
              </div>
            </div>
            <div>Edit Profile</div>
          </div>
        </div>  */}

        {/*         
        <motion.div className="flex items-center justify-center mb-6">
          {image ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-16 w-16 p-2 rounded-full overflow-hidden"
            >
              <Image
                src={image}
                height={64}
                width={64}
                alt="User Profile"
                className="object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white dark:text-blacktext-2xl font-bold"
            >
              {name.charAt(0)}
            </motion.div>
          )}
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
            <p className="text-xs text-gray-400 mt-1">Device: {deviceName}</p>
          </div>
        </motion.div>

        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Edit className="text-green-600" /> Update Profile
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="p-3 border border-gray-300 rounded-md w-full focus:ring focus:ring-green-200"
              placeholder="Update your name"
            />
          </div>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-md w-full"
            />
            <ImageIcon className="absolute top-2 right-2 text-gray-400" />
          </div>
          <motion.button
            onClick={handleUpdateProfile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-green-600 text-white dark:text-blackrounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Edit /> Update Profile
          </motion.button>
        </div>

        <motion.div
          className="mt-8 flex flex-col space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.button
            onClick={handleDeleteAccount}
            whileHover={{ scale: 1.05, backgroundColor: "#FF4D4D" }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-red-600 text-white dark:text-blackrounded-md hover:bg-red-700 transition flex items-center justify-center gap-2"
          >
            <Trash /> Delete Account
          </motion.button>

          <motion.button
            onClick={() => signOut()}
            whileHover={{ scale: 1.05, backgroundColor: "#4D4DFF" }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-gray-600 text-white dark:text-blackrounded-md hover:bg-gray-700 transition flex items-center justify-center gap-2"
          >
            <LogOut /> Sign Out
          </motion.button>
        </motion.div> */}
      </motion.div>
    </Container>
  );
};

export default AccountManagement;
