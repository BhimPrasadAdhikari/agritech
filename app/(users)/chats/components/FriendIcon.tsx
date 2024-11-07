/* eslint-disable @typescript-eslint/no-unused-vars */
// components/sidebar/FriendIcon.tsx
"use client";
import React, { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import UserList from "./UserList";
import { Conversation } from "@prisma/client";
interface ConversationType {
  id: string;
  lastMessage: string;
}
interface FriendIconProps {
  handleSelectConversation: (
    conversationId: string,
    recipientId: string
  ) => void;
  AddRecipientId: (id: string) => void;
}
const FriendIcon: React.FC<FriendIconProps> = ({
  handleSelectConversation,
  AddRecipientId,
}) => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe("currentUserId"); // Replace with actual user ID

    channel.bind("conversation:update", (update: ConversationType) => {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === update.id
            ? { ...conv, lastMessage: update.lastMessage }
            : conv
        )
      );
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const onConversationSelect = (
    conversationId: string,
    recipientId: string
  ) => {
    handleSelectConversation(conversationId, recipientId);
  };
  const addReceipentId = (id: string) => {
    AddRecipientId(id);
  };

  return (
    <div>
      <UserList
        // conversations={conversations}
        onSelectConversation={onConversationSelect} // Pass both IDs
        addRecipientId={addReceipentId}
      />
    </div>
  );
};

export default FriendIcon;
