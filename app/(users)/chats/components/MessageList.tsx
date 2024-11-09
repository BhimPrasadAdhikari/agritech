// components/chat/MessageList.tsx
import React from "react";
import MessageItem from "./MessageItem";
type Message={
  body: string;
  imageUrls: string[] | null;
  sender: { id: string; name: string };
  isPending?: boolean;
  createdAt: Date;
  tempId?: number;
}
const MessageList = ({ messages, currentUserId }:{messages:Message[],currentUserId:string}) => {
  console.log("messages",messages)
  return (
    <div className="flex flex-col p-4 bg-green-50 overflow-y-auto h-full">
      {messages.map((message) => (
        <div
          key={message.tempId}
          className={`flex ${message.sender.id === currentUserId ? "justify-end" : "justify-start"}`}
        >

        <MessageItem
          key={message.tempId}
          message={message}
          currentUserId={currentUserId}
        />
        </div>
      ))}
    </div>
  );
};
export default MessageList;
