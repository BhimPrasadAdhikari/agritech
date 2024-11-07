// components/ChatWithExpert.tsx
import React, { useState } from "react";
import { format, isToday, isYesterday } from "date-fns"; // Import date-fns for formatting
import { motion } from "framer-motion";
import { SendIcon, LoaderIcon, CircleX, Expand, Download } from "lucide-react";
import ImageUpload from "./image-upload";
import Image from "next/image";
import { Dialog } from "@headlessui/react"; // For modal
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
  sender: "user" | "expert";
  timestamp: Date;
  imageUrls?: string[] | null;
}
interface ChatWithExpertProps {
  expertName: string | null;
  expertProfile: string | null;
}
const ChatWithExpert: React.FC<ChatWithExpertProps> = ({
  expertName,
  expertProfile,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Store image URLs here
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // For modal
  const initialVisibleImages = 4; // Number of initially visible colors
  const [showAllImages, setShowAllImages] = useState(false); // Manage whether to show all colors or not
  const toggleShowAllImages = () => {
    setShowAllImages(!showAllImages); // Toggle between showing all or limited colors
  };
  const formatTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);
    if (isToday(date)) {
      return format(date, "'Today at' h:mm a"); // "Today at 3:45 PM"
    } else if (isYesterday(date)) {
      return format(date, "'Yesterday at' h:mm a"); // "Yesterday at 3:45 PM"
    } else {
      return format(date, "MMM dd, h:mm a"); // "Oct 8, 3:45 PM"
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() || imageUrls.length > 0) {
      setLoading(true);
      const message: ChatMessage = {
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
        imageUrls: imageUrls.length > 0 ? imageUrls : null,
      };

      setMessages((prevMessages) => [...prevMessages, message]);
      setIsTyping(false);
      setNewMessage("");
      setImageUrls([]); // Clear image URLs after sending
      setLoading(false);
    }
  };

  const handleTyping = () => {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-4 bg-white dark:bg-black shadow-md rounded-lg"
    >
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16">
          <Image
            src={expertProfile || ""}
            alt={`${expertName} profile`}
            fill
            className="rounded-full object-cover"
          />
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
        </div>
        <h3 className="text-xl font-semibold ml-4">{expertName}</h3>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="chat-window bg-gray-100 p-4 rounded-lg mb-4 min-h-96 overflow-y-auto overflow-x-hidden max-h-96"
      >
        {messages.map((msg, index) => (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            key={index}
            className={`flex mb-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <motion.div
              initial={{ x: msg.sender === "user" ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`p-2 rounded-lg text-white dark:text-black${
                msg.sender === "user" ? "bg-black" : "bg-green-900"
              }`}
            >
              <div>{msg.text}</div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {msg.imageUrls && msg.imageUrls.length > 0 && (
                  <>
                    {showAllImages
                      ? msg.imageUrls.map((url, i) => (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            key={i}
                            className="relative"
                          >
                            <Image
                              src={url}
                              alt="Chat image"
                              className="rounded-lg cursor-pointer"
                              width={100}
                              height={100}
                              onClick={() => setSelectedImage(url)} // Open full image on click
                            />
                          </motion.div>
                        ))
                      : msg.imageUrls
                          .slice(0, initialVisibleImages)
                          .map((url, i) => (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              key={i}
                              className="relative"
                            >
                              <Image
                                src={url}
                                alt="Chat image"
                                className="rounded-lg cursor-pointer"
                                width={100}
                                height={100}
                                onClick={() => setSelectedImage(url)} // Open full image on click
                              />
                            </motion.div>
                          ))}
                    {msg.imageUrls &&
                      msg.imageUrls.length > initialVisibleImages && (
                        <button
                          className="text-sm text-gray-600 underline cursor-pointer"
                          onClick={toggleShowAllImages} // Show first image in modal for all
                        >
                          {showAllImages
                            ? "Show less"
                            : `${
                                msg.imageUrls.length - initialVisibleImages
                              } more`}
                        </button>
                      )}
                  </>
                )}
              </div>
              {/* Timestamp */}
              <p className="text-xs text-gray-400 mt-1">
                {formatTimestamp(new Date(msg.timestamp))}{" "}
                {/* Call the formatting function */}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Typing Indicator with Animation */}
      {isTyping && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{expertName} is typing</span>
          <motion.div
            className="ml-2 flex space-x-1"
            initial="hidden"
            animate="visible"
            variants={typingAnimation}
          >
            <motion.span
              className="block h-1 w-1 bg-gray-500 rounded-full"
              transition={{ duration: 0.4, delay: 0 }}
            />
            <motion.span
              className="block h-1 w-1 bg-gray-500 rounded-full"
              transition={{ duration: 0.4, delay: 0.2 }}
            />
            <motion.span
              className="block h-1 w-1 bg-gray-500 rounded-full"
              transition={{ duration: 0.4, delay: 0.4 }}
            />
          </motion.div>
        </div>
      )}

      <div className="flex items-center mt-4 relative flex-wrap">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Type your message..."
          className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:outline-none"
        />

        <ImageUpload
          disabled={loading}
          value={imageUrls}
          onChange={(url) => setImageUrls((prev) => [...prev, url])}
          onRemove={(url) =>
            setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url))
          }
        />

        <button
          onClick={sendMessage}
          className={`bg-blue-500 text-white dark:text-blackp-2 rounded-r-lg hover:bg-blue-600 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <LoaderIcon className="w-5 h-5 animate-spin" />
          ) : (
            <SendIcon className="w-5 h-5" />
          )}
        </button>
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
    </motion.div>
  );
};

export default ChatWithExpert;
