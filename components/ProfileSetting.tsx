/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Trash2Icon } from "lucide-react";
import { UserType } from "./AccountManagement";
const ProfileSetting = ({ user }: { user: UserType }) => {
  const [image, setImage] = useState(user?.image?.url || null);
  const [emails, setEmails] = useState(user?.email || null);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [connectedAccounts, setConnectedAccounts] = useState(
    user?.accounts || null
  );
  const [name, setName] = useState(user?.name || "");
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
    console.log("Account deletion requested for:", user?.email);
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
    <div>
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
                {connectedAccounts && connectedAccounts.length >0 && connectedAccounts.map((account, index) => (
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
    </div>
  );
};

export default ProfileSetting;
