/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ExpertGroup.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// import useExpertChatModel from "@/hooks/use-expertchat-model";
import useExpertApplicationModel from "@/hooks/use-expertapplication-model";
import useExpertConsultPaymentModel from "@/hooks/use-expertConsultPayment-model";
import { Button } from "./ui/Button";
import { useSession } from "next-auth/react";
import { Image as ImageType, User } from "@prisma/client";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUpload from "./image-upload";

interface ExpertGroupProps {
  experts: (User & { image: ImageType | null;})[];
}

const ExpertGroup: React.FC<ExpertGroupProps> = ({ experts }) => {
  // const ExpertChatModel = useExpertChatModel();
  console.log(experts);
  const ExpertApplicationModel = useExpertApplicationModel();
  const ExpertConsultPaymentModel = useExpertConsultPaymentModel();
  const session = useSession();

  const [editId, setEditId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [editedImage, setEditedImage] = useState<string>("");
  const [friends, setFriends] = useState<string[]>([]); // State to hold friend IDs

  const [editedExpertise, setEditedExpertise] = useState<string>("");
  const [editedAvailability, setEditedAvailability] = useState<string>("");
  const currentUserEmail = session.data?.user.email; // Get current user's email
  const currentUserId = session.data?.user.id;
  // Sort experts so the current user is at the top
  const sortedExperts = experts.sort((a, b) => {
    if (a.email === currentUserEmail) return -1;
    if (b.email === currentUserEmail) return 1;
    return 0;
  });

  const handleEditClick = (expert: User & { image: ImageType | null }) => {
    setEditId(expert.id);
    setEditedName(expert.name || "");
    setEditedExpertise(expert.expertise || "");
    setEditedAvailability(expert.availability || "");
    setEditedImage(expert.image?.url || "");
  };
  const handleAddFriend = async (friendId: string) => {
    try {
      await axios.post("/api/friends", { userId: currentUserId, friendId });
      toast.success("Friend Added");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      if (currentUserId) {
        try {
          const response = await axios.get(
            `/api/friends?userId=${currentUserId}`
          );
          setFriends(response.data.friends.map((friend: User) => friend.id)); // Store friend IDs
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      }
    };
    fetchFriends();
  },[currentUserId]);

  const handleSave = () => {
    setEditId(null);
    axios
      .patch(`/api/users/${editId}`, {
        name: editedName,
        image: editedImage,

        expertise: editedExpertise,
        availability: editedAvailability,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Saved");
          setEditId(null);
        }
      });
  };

  const handleConsult = (expert:  User & { image: ImageType | null }) => {
    ExpertConsultPaymentModel.setExpert(expert);
    ExpertConsultPaymentModel.onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8"
    >
      {session.data?.user.role !== "EXPERT" && (
        <div className="text-center mb-6">
          <Button
            className="bg-green-800 text-white rounded-lg px-6 py-2"
            onClick={() => ExpertApplicationModel.onOpen()}
          >
            Become an Expert
          </Button>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-6">
        {session.data?.user.role !== "EXPERT"
          ? "Consult with Our Agriculture Experts"
          : "Expert Directory"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedExperts.map((expert) => (
          <motion.div
            key={expert.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center transition-all"
          >
            <motion.div
              className="relative w-24 h-24 rounded-full overflow-hidden mb-4"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Image
                src={
                  editId === expert.id
                    ? editedImage
                    : expert.image?.url || "/images/profile.png"
                }
                alt={expert.name || "Profile Image"}
                className="rounded-full object-cover"
                fill
                priority
              />
              {editId === expert.id && (
                <div className="absolute top-9 right-4">
                  <ImageUpload
                    onChange={(url: string) => setEditedImage(url)}
                    value={[]}
                    onRemove={() => {}}
                    disabled={false}
                  />
                </div>
              )}
            </motion.div>

            {editId === expert.id ? (
              <>
                <input
                  value={editedName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedName(e.target.value)
                  }
                  className="w-full mb-2 text-center outline-none border-b border-gray-300"
                  placeholder="Name"
                />
                <input
                  value={editedExpertise}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedExpertise(e.target.value)
                  }
                  className="w-full mb-2 text-center outline-none border-b border-gray-300"
                  placeholder="Expertise"
                />
                <input
                  value={editedAvailability}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedAvailability(e.target.value)
                  }
                  className="w-full mb-4 text-center outline-none border-b border-gray-300"
                  placeholder="Availability"
                />
                <button
                  className="mt-4 bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-2">{expert.name}</h3>
                <p className="text-gray-500 mb-1">{expert.expertise}</p>
                <p className="text-gray-500 mb-4">
                  Availability: {expert.availability}
                </p>
                <div className="mt-2 text-yellow-500 flex items-center">
                  Rating: {expert.rating} <FaStar className="ml-1" />
                </div>

                {session.data?.user.role !== "EXPERT" ? (
                  <button
                    className="mt-4 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                    onClick={() => handleConsult(expert)}
                  >
                    Consult Now
                  </button>
                ) : expert.id !== session.data.user.id ? (
                  <div>
                    {friends.includes(expert.id) ? (
                      <button
                        className="mt-4 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                        disabled
                      >
                        Friends
                      </button>
                    ) : (
                      <button
                        className="mt-4 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                        onClick={() => handleAddFriend(expert.id)}
                      >
                        Add Friend
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    className="mt-4 bg-yellow-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-600"
                    onClick={() => handleEditClick(expert)}
                  >
                    Edit Details
                  </button>
                )}
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExpertGroup;
