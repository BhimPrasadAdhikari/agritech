
"use client"
import React, {useState } from 'react';
import ChatWindow from './components/ChatWindow';
import SideBar from './components/SideBar';
const ChatPage = () => {
  
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [recipientId, setRecipientId] = useState<string | null>(null); // State to hold recipient ID
  const handleSelectConversation = async (conversationId: string | null, recipientId: string) => {
    setSelectedConversationId(conversationId);
    setRecipientId(recipientId);
  };
  const AddRecipientId=(id:string)=>{
    setRecipientId(id);
  }
  return (
      <div className="flex flex-col md:flex-row w-full h-screen bg-green-100">
        <aside className="w-full md:w-auto bg-white text-white p-4">
          <SideBar handleSelectConversation={handleSelectConversation} AddRecipientId={AddRecipientId}/>
        </aside>
        <main className="flex-1 flex flex-col h-full bg-green-50">
          {selectedConversationId || recipientId ? (
            <ChatWindow 
              conversationId={selectedConversationId} 
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
