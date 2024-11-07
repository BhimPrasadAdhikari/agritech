/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
//chat component with sidebar and body 
import Pusher from 'pusher-js'
import { FaUserFriends, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { SendIcon, LoaderIcon, CircleX, Expand, Download } from "lucide-react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import ImageUpload from "@/components/image-upload";
import axios from "axios";
import { useSession } from "next-auth/react";
import FriendIcon from "./UserList";
import { useSearchParams } from "next/navigation";
import { User,Image as ImageType } from "@prisma/client";
import toast from 'react-hot-toast';
import { pusherClient } from '@/lib/pusher';
const typingAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 1,
    },
  },
};
interface ChatMessage {
  text: string;
  sender: string;
  senderId: string;
  conversationId:string;
  timestamp: Date;
  imageUrls?: string[] | null;
}
interface ConversationType {
  id: string;
  name: string;
  lastMessage: string;
}
const Chat = () => {
  const session = useSession();
  const params= useSearchParams()
  const userId =params.get('userId')
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const initialVisibleImages = 4; 
  const [user,setUser]=useState< User & { image: ImageType | null }>();
  const [showAllImages, setShowAllImages] = useState(false);

  const toggleShowAllImages = () => {
    setShowAllImages(!showAllImages);
  };

  const formatTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, "'Today at' h:mm a");
    } else if (isYesterday(date)) {
      return format(date, "'Yesterday at' h:mm a");
    } else {
      return format(date, "MMM dd, h:mm a");
    }
  };
useEffect(()=>{
  async function fetchUser(){
    await axios.get(`/api/users/${userId}`).then(res=>{
      if(res.data.success){
        setUser(res.data.user)
        console.log(res)
        setSelectedConversation(res.data.user.id)
      }
    })
    
  }
  fetchUser()
},[userId])
useEffect(() => {
 const channel= pusherClient.subscribe(selectedConversation as string)


  channel.bind('message', (data: ChatMessage) => {
    if (data.conversationId === selectedConversation) {
      setMessages((prevMessages) => [...prevMessages, data]);
    }
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
    pusherClient.disconnect();
  };
}, [selectedConversation]); // Only re-run if conversation changes

  const sendMessage = async () => {
    if (newMessage.trim() || imageUrls.length > 0) {
      setLoading(true);
      setIsTyping(false);
      const message: ChatMessage = {
        text: newMessage,
        sender: session.data?.user.role.toLowerCase() as string,
        senderId:session.data?.user.id as string,
        conversationId:selectedConversation as string,
        timestamp: new Date(),
        imageUrls: imageUrls.length > 0 ? imageUrls : null,
      };
      try{
      await axios.post('/api/messages',message)}catch(error){
        console.error('message_post',error);
        toast.error("couldn't send the message")
      }
      
      setNewMessage("");
      setImageUrls([]);
      setLoading(false);
    }
  };

  const handleTyping = () => {
    setIsTyping(true);
  };

  // Fetch conversations excluding the current user
  useEffect(() => {
    const fetchConversations = async () => {
      if (session.data) {
        try{
        const response = await axios.get(`/api/conversations?userId=${session.data.user.id}`);
        const filteredConversations = response.data.filter((conversation: ConversationType) => {
          // Assuming the conversation object contains a userId or similar that identifies the participants
          return conversation.id !== session.data.user.id; // Exclude current user
        });
        setConversations(filteredConversations);}catch(error){
          console.error("Something went wrong",error);
        }
      }
    };
    fetchConversations();
  }, [session.data]);

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    // Optionally, you might want to fetch messages for the selected conversation here
  };

  return (
    <div className="flex h-screen dark:bg-black">
      <div className="bg-green-700 text-white dark:text-black p-4 space-y-6">
        <div className="flex justify-between">
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer p-2 bg-green-800 rounded-md">
            <FaComments size={24} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer p-2 bg-green-800 rounded-md">
            <FriendIcon onSelectConversation={handleSelectConversation} addRecipientId={()=>{}} />
          </motion.div>
        </div>

        <div className="mt-10 space-y-4">
          <h2 className="text-xl font-bold">Conversations</h2>
          {conversations.map((conversation) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={conversation.id}
              className={`cursor-pointer p-3 rounded-md ${
                selectedConversation === conversation.id ? "bg-green-600" : "bg-green-800"
              }`}
              onClick={() => handleSelectConversation(conversation.id)}
            >
              <h3 className="font-semibold">{conversation.name}</h3>
              <p className="text-sm">{conversation.lastMessage}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-3/4 bg-white dark:bg-black p-6">
        {selectedConversation ? (
          <motion.div className="space-y-6" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold text-green-700">
              Conversation with {conversations.find((c) => c.id === selectedConversation)?.name || user?.name }
            </h2>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              key={selectedConversation}
              className="chat-window bg-gray-100 p-4 rounded-lg mb-4 h-96 overflow-y-auto"
            >
              {messages.map((msg, index) => (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  key={index}
                  className={`flex mb-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <motion.div
                    initial={{ x: msg.senderId === session.data?.user.id ? 50 : -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`p-2 rounded-lg text-white dark:text-black ${
                      msg.senderId === session.data?.user.id? "bg-green-500" : "bg-green-700"
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {msg.imageUrls && msg.imageUrls.length > 0 && (
                        <>
                          {showAllImages
                            ? msg.imageUrls.map((url, i) => (
                                <motion.div whileHover={{ scale: 1.1 }} key={i} className="relative">
                                  <Image src={url} alt="Chat image"
                                onClick={() => setSelectedImage(url)} // Open full image on click
                                  
                                  className="rounded-lg cursor-pointer" width={100} height={100} />
                                </motion.div>
                              ))
                            : msg.imageUrls.slice(0, initialVisibleImages).map((url, i) => (
                                <motion.div whileHover={{ scale: 1.1 }} key={i} className="relative">
                                  <Image src={url} 
                                onClick={() => setSelectedImage(url)} // Open full image on click
                                  
                                  alt="Chat image" className="rounded-lg cursor-pointer" width={100} height={100} />
                                </motion.div>
                              ))}
                          {msg.imageUrls.length > initialVisibleImages && (
                            <button
                              className="text-sm text-yellow-400 underline cursor-pointer"
                              onClick={toggleShowAllImages}
                            >
                              {showAllImages ? "Show less" : `${msg.imageUrls.length - initialVisibleImages} more`}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-900 mt-1">
                      {formatTimestamp(new Date(msg.timestamp))}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            {isTyping && (
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{conversations.find((c) => c.id === selectedConversation)?.name} is typing...</span>
                <motion.div className="ml-2 flex space-x-1" initial="hidden" animate="visible" variants={typingAnimation}>
                  <motion.span className="block h-1 w-1 bg-gray-500 rounded-full" transition={{ duration: 0.4, delay: 0 }} />
                  <motion.span className="block h-1 w-1 bg-gray-500 rounded-full" transition={{ duration: 0.4, delay: 0.1 }} />
                  <motion.span className="block h-1 w-1 bg-gray-500 rounded-full" transition={{ duration: 0.4, delay: 0.2 }} />
                </motion.div>
              </div>
            )}
            <div className="flex mt-4">
            <ImageUpload
               name='chat'
          disabled={loading}
          value={imageUrls}
          onChange={(url) => setImageUrls((prev) => [...prev, url])}
          onRemove={(url) =>
            setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url))
          }
        />
              <input
                type="text"
                className="flex-1 border rounded-lg px-4 py-2"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                onFocus={handleTyping}
              />
               
              <button onClick={sendMessage} className="bg-green-500 text-white rounded-lg px-4 ml-2" disabled={loading}>
                {loading ? <LoaderIcon className="animate-spin" /> : <SendIcon />}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-500">Select a conversation to start chatting.</p>
          </div>
        )}
      </div>

    {/* Image modal for viewing full image */}
    {selectedImage && (
        <Dialog
          open={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white dark:bg-black p-4 rounded-lg"
          >
            <button
              className="absolute top-4 right-2 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <CircleX fill="black" />
            </button>
            <Image
              src={selectedImage}
              alt="Full image"
              width={500}
              height={500}
              className="rounded-lg"
            />
            <div className="mt-2 flex justify-between absolute bottom-4 left-6 gap-3">
              <button
                className="text-white dark:text-blackbg-black p-2 rounded-full"
                onClick={() => window.open(selectedImage)}
              >
                <Expand />
              </button>
              <button
                className="text-white dark:text-blackbg-black p-2 rounded-full"
                onClick={async () => {
                  if (selectedImage) {
                    try {
                      const response = await fetch(selectedImage);
                      const blob = await response.blob();
                      const link = document.createElement("a");
                      const url = window.URL.createObjectURL(blob);
                      link.href = url;
                      link.setAttribute("download", "image.jpg"); // You can set the filename here
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                      window.URL.revokeObjectURL(url); // Clean up URL object
                    } catch (error) {
                      console.error("Error downloading the image:", error);
                    }
                  }
                }}
              >
                <Download />
              </button>
            </div>
          </motion.div>
        </Dialog>
      )}

    </div>
    
  );
};

export default Chat;
