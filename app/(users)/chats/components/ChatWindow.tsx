// ChatWindow.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { pusherClient } from "@/lib/pusher";
import { useSession } from "next-auth/react";
import axios from "axios";
import VideoCall from "@/components/VideoCall";
import Image from "next/image";
import { Image as ImageType, User } from "@prisma/client";
interface Message {
  body: string;
  imageUrls: string[] | null;
  sender: { id: string; name: string };
  isPending?: boolean;
  createdAt: Date;
  tempId?: number;
}
interface ChatWindowProps {
  conversationId: string | null;
  recipientId: string | null;
}
const ChatWindow: React.FC<ChatWindowProps> = ({
  conversationId,
  recipientId,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingMessages, setPendingMessages] = useState<Message[]>([]); // Track pending messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [recipient,setRecipient]=useState<User & {image:ImageType | null} | null>(null)

  const session = useSession();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([]);
    setPendingMessages([]);
    const fetchMessages = async () => {
      if (conversationId) {
        try {
          const response = await axios.get(
            `/api/messages/${conversationId}`
          );
          if (response.statusText === "OK") {
            console.log("old messages", response.data.messages);
            setMessages(response.data.messages.map((m)=>({
              body:m.body,
              createdAt:m.createdAt,
              imageUrls:m.image,
              sender:{
                id:m.sender.id,
                name:m.sender.name
              }
            })))
          }
          
        } catch (error) {
          console.error("messages_fetch", error);
        }
      }
    };
    fetchMessages();
  }, [conversationId]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, pendingMessages]);
  useEffect(()=>{
    setMessages([]);
    setPendingMessages([]);
    async function fetchRecipientInfo() {
      try{
        const response = await axios.get(`/api/users/${recipientId}`)
        if(response.data.success){
               
          setRecipient(response.data.user);
        }
      }catch(error){console.error("fetchRecipientInfo",error)}
    }
    fetchRecipientInfo();

    const fetchMessages = async () => {
      if (recipientId) {
        try {
          const response = await axios.get(
            `/api/messages?recipientId=${recipientId}`
          );
          if (response.statusText === "OK") {
            console.log("old messages", response.data.messages);
            setMessages(response.data.messages.map((m)=>({
              body:m.body,
              createdAt:m.createdAt,
              imageUrls:m.image,
              sender:{
                id:m.sender.id,
                name:m.sender.name
              }
            })))
          }
        } catch (error) {
          console.error("messages_fetch", error);
        }
      }
    };
    fetchMessages();

  },[recipientId])

  // Listen for new messages in real-time
  useEffect(() => {
    console.log("session.data?.user.id", session.data?.user.id);
    const channel = pusherClient.subscribe(`user-${session.data?.user.id}`);

    channel.bind("messages:new", (newMessage: Message) => {
      // Remove message from pending list if it matches the new message ID
      setPendingMessages((prevPending) =>
        prevPending.filter((msg) => msg.tempId !== newMessage.tempId)
      );
      console.log("New message received:", newMessage); // Debugging
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [session.data?.user.id]);

  const handleSendMessage = async (text: string, imageUrls: string[]) => {
    const tempId = Date.now();
    const tempMessage: Message = {
      body: text,
      imageUrls: imageUrls.length > 0 ? imageUrls : null,
      sender: {
        id: session.data?.user.id as string,
        name: session.data?.user.name as string,
      },
      isPending: true,
      createdAt: new Date(),
      tempId,
    };
    setPendingMessages((prevPending) => [...prevPending, tempMessage]);

    try {
      const response = await axios.post("/api/messages", {
        text,
        imageUrls: imageUrls.length > 0 ? imageUrls : null,
        senderId: session.data?.user.id,
        recipientId,
        conversationId,
        timestamp: new Date(),
      });

      console.log("message response", response);

      if (response.statusText !== "OK") {
        console.error("Failed to send message:", response.data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4 justify-around border-b-2 p-2">
        <div className="flex items-center">
        <div className="relative w-16 h-16">
          <Image
            src={recipient?.image?.url || "/images/profile.png"}
            alt={recipient?.name|| 'profile'}

            fill
            className="rounded-full object-cover"
          />
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
        </div>
        <h3 className="text-xl font-semibold ml-4">{recipient?.name}</h3>
        </div>
        <VideoCall
        currentUserId={session.data?.user.id as string}
        recipientId={recipientId}
      />
      </div>
     
      <div
        className="flex-grow overflow-y-auto h-80 p-4"
        style={{ maxHeight: "500px" }}
      >
        <MessageList
          messages={[...messages, ...pendingMessages]}
          currentUserId={session.data?.user.id as string}
        />
        <div ref={messagesEndRef} />
      </div>
        <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
