/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem"; // Component for individual conversation
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

interface ConversationType {
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

}
interface ConversationListProps {
  handleSelectConversation: (
    conversationId: string,
    recipientId: string
  ) => void;
  AddRecipientId: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  handleSelectConversation,
}) => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();
  const currentUserId = session.data?.user.email;
  console.log(session);
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try{
      // Fetch conversations from the server (e.g., via an API request or directly from the database)
      const response = await axios.get(`/api/conversations`);
      const data = await response.data;
      setConversations(data.conversation);}catch(error){
        toast.error("OOps! something went wrong. Try again later")
        setLoading(false);
      }finally{
      setLoading(false);}
    };

    fetchConversations();
  }, [currentUserId]);

  const onConversationSelect = (
    conversationId: string,
    recipientId: string
  ) => {
    handleSelectConversation(conversationId, recipientId);
  };

  return (
    
    <div className="sidebar">
      {loading ? (
        <div>Loading...</div>
      ) : conversations.length > 0 ? (
        <div>
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              onSelectConversation={onConversationSelect}
            />
          ))}
        </div>
      ) : (
        <div className="no-conversations">
          <p>No conversations yet.</p>
        </div>
      )}
    </div>
  );
};

export default ConversationList;
