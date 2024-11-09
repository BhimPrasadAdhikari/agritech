// components/sidebar/ConversationItem.tsx
import Image from "next/image";
import React from "react";
import { formatTimestamp } from "./MessageItem";

interface ConversationItemProps {
  conversation: {
    id: string;
    createdAt: Date;
    users: {
      id:string,
      messages: {
        image: string[];
        id: string;
        body: string | null;
        createdAt:Date;
        sender: {
          image: {
            url: string;
          } | null;
          id: string;
          name: string | null;
        };
      }[];
    }[];
  };
  onSelectConversation: (conversationId: string, recipientId: string) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onSelectConversation,
}) => {
  console.log(conversation);
  return (
    <div
      className="flex items-center cursor-pointer bg-gray-800 p-2 my-2 rounded-md"
      onClick={() =>
        onSelectConversation(conversation.id, conversation.users[0].id)
      }
    >
      <div className="relative h-10 w-10 rounded-full mr-4">
        <Image
          src={
            conversation.users[0].messages[0].sender.image?.url ||
            "/images/profile.png"
          }
          fill
          alt="user profile"
          className="object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl">{conversation.users[0].messages[0].sender.name}</span>
        <span>{conversation.users[0].messages[0]?.body}</span>
        <span className="text-xs text-gray-500">{formatTimestamp(new Date(conversation.users[0].messages[0].createdAt))}</span>
      </div>
      <div></div>
    </div>
  );
};

export default ConversationItem;
