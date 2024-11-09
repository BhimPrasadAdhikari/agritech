/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import ConversationList from "./ConversationList";
import UserList from "./UserList";
import { Button } from "@/components/ui/Button";
import { FaBars, FaEdit, FaPencilAlt, FaUsers } from "react-icons/fa";
import IconButton from "@/components/ui/icon-button";
import { Model } from "@/components/ui/model";
import SlidingSidebar from "./SlidingSidebar";
import ChatMenu from "./ChatMenu";
interface ConversationType {
  id: string;
  lastMessage: string;
}
interface SideBarProps {
  handleSelectConversation: (
    conversationId: string | null,
    recipientId: string
  ) => void;
  AddRecipientId: (id: string) => void;
}
const SideBar: React.FC<SideBarProps> = ({
  handleSelectConversation,
  AddRecipientId,
}) => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState<React.ReactNode>(null);
  const [sideBarTitle, setSideBarTitle] = useState<string>('');

  const openSidebar = (content: React.ReactNode,title:string) => {
    setSidebarContent(content);
    setSideBarTitle(title)
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSidebarContent(null);
  };

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
    conversationId: string | null,
    recipientId: string
  ) => {
    handleSelectConversation(conversationId, recipientId);
  };
  const addReceipentId = (id: string) => {
    AddRecipientId(id);
  };
  return (
    <div className="relative h-full flex flex-col bg-white overflow-hidden">
      <div className="border-b-2 mb-2 text-black flex justify-between p-2">
      <IconButton
          icon={<FaBars />}
          className="bg-gray-100 rounded-full p-2 shadow-sm"
          onClick={() => openSidebar(<ChatMenu/>,'Menu')}
          ></IconButton>
        <IconButton
          icon={<FaUsers />}
          className="bg-gray-100 rounded-full p-2 shadow-sm"
          onClick={() => openSidebar(<UserList addRecipientId={addReceipentId} onSelectConversation={onConversationSelect}/>,'New Message')}

        ></IconButton>
      </div>
      <ConversationList
        AddRecipientId={addReceipentId}
        handleSelectConversation={onConversationSelect}
      />
      
      <div className="min-h-full">
      <SlidingSidebar isOpen={isSidebarOpen} onClose={closeSidebar} content={sidebarContent} title={sideBarTitle}/>
      </div>
    </div>
  );
};

export default SideBar;
