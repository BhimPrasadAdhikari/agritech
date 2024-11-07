// components/sidebar/UserItem.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaUserFriends } from "react-icons/fa";
import Image from "next/image";
import { User, Image as ImageType } from "@prisma/client";
interface UserItemProps {
  user: User & { image: ImageType | null };
  onSelectConversation: (conversationId: string,
    recipientId: string) => void;
  addRecipientId: (id: string) => void;
}
const UserItem: React.FC<UserItemProps> = ({
  user,
  onSelectConversation,
  addRecipientId,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center p-2 bg-green-200 rounded-md cursor-pointer my-2"
      onClick={() => {
        onSelectConversation(user.id,user.id); addRecipientId(user.id);
      }}
    >
      <div className="relative rounded-full w-10 h-10 mr-3">
        <Image
          src={user.image ? user.image.url : "/images/profile.png"}
          alt={user.name || "User"}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <span className="text-gray-800">{user.name}</span>
      <FaUserFriends className="ml-auto text-green-500" />
    </motion.div>
  );
};

export default UserItem;
