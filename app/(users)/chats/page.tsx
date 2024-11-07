/* eslint-disable @typescript-eslint/no-unused-vars */
// // import ExpertGroup from "@/components/ExpertGroup"
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import Layout from "@/components/Layout";
// import Chat from "./components/Chat";
// import { Metadata } from "next";
// import prismadb from "@/lib/prismadb";
// export const metadata:Metadata={
//   title:"Chats",
//   description:"chat with farmers"
// }
// const ChatPage = async(req:{searchParams:{userId:string}}) => {
//  const userId = req.searchParams.userId
//  if(userId){
//   const user= await prismadb.user.findUnique({
//     where:{
//       id:userId
//     }
//   })
//   console.log(user)
//   }
//   return (
//     <>
//       <Header />
//       <Layout>
//         {/* <ExpertGroup/> */}
//         <Chat/>
//       </Layout>
//       <Footer />
//     </>
//   );
// };
// export default ChatPage;


// app/chat/ChatPage.tsx
// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import ChatWindow from './components/ChatWindow';
// import FriendIcon from './components/FriendIcon';
// import prismadb from '@/lib/prismadb';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import Layout from '@/components/Layout';

// const ChatPage =() => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const userId = searchParams.get('userId');
  
//   const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
//   const [initialMessages, setInitialMessages] = useState([]);

//   // Fetch messages and set initial state when a conversation is selected
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (selectedConversationId) {
//         const response = await fetch(`/api/conversations/${selectedConversationId}/messages`);
//         const data = await response.json();
//         setInitialMessages(data.messages);
//       }
//     };
//     fetchMessages();
//   }, [selectedConversationId]);

//   const handleSelectConversation = (conversationId: string) => {
//     setSelectedConversationId(conversationId);
//   };

//   return (
//     <Layout>
//       <Header />
//       <div className="flex flex-col md:flex-row w-full h-screen bg-green-100">
//         <aside className="w-full md:w-1/4 bg-green-700 text-white p-4">
//           <FriendIcon handleSelectConversation={handleSelectConversation} />
//         </aside>
//         <main className="flex-1 flex flex-col h-full bg-green-50">
//           {selectedConversationId ? (
//             <ChatWindow conversationId={selectedConversationId} initialMessages={initialMessages} />
//           ) : (
//             <div className="flex items-center justify-center h-full text-gray-500">
//               <p>Select a conversation to start chatting</p>
//             </div>
//           )}
//         </main>
//       </div>
//       <Footer />
//     </Layout>
//   );
// };

// export default ChatPage;


// app/chat/ChatPage.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter} from 'next/navigation';
import ChatWindow from './components/ChatWindow';
import FriendIcon from './components/FriendIcon';
import prismadb from '@/lib/prismadb';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const ChatPage = () => {
  const router = useRouter();
  const session = useSession();
  
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [initialMessages, setInitialMessages] = useState([]);
  const [recipientId, setRecipientId] = useState<string | null>(null); // State to hold recipient ID
  console.log("recid",recipientId)
  // Fetch messages when a conversation is selected
  // Function to handle conversation selection
  const handleSelectConversation = async (conversationId: string, recipientId: string) => {
    // Set the selected conversation ID and recipient ID
    setSelectedConversationId(conversationId);
    setRecipientId(recipientId);

    // Optionally, you might want to fetch messages here if needed
  };
  const AddRecipientId=(id:string)=>{
    setRecipientId(id);
  }

  return (
   
      <div className="flex flex-col md:flex-row w-full h-screen bg-green-100">
        <aside className="w-full md:w-1/4 bg-green-700 text-white p-4">
          <FriendIcon handleSelectConversation={handleSelectConversation} AddRecipientId={AddRecipientId}/>
        </aside>
        <main className="flex-1 flex flex-col h-full bg-green-50">
          {selectedConversationId ? (
            <ChatWindow 
              conversationId={selectedConversationId} 
              initialMessages={initialMessages} 
              recipientId={recipientId} // Pass the recipientId to ChatWindow
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </main>
      </div>
  
  );
};

export default ChatPage;
