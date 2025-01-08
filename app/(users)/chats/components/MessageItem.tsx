/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { CircleX, Expand, Download } from "lucide-react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
interface MessageType {
  body: string;
  imageUrls: string[] | null;
  sender: { id: string; name: string };
  isPending?: boolean;
  createdAt: Date;
  tempId?: number;
}
export const formatTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);
  if (isToday(date)) {
    return format(date, "'Today at' h:mm a");
  } else if (isYesterday(date)) {
    return format(date, "'Yesterday at' h:mm a");
  } else {
    return format(date, "MMM dd, h:mm a");
  }
};
const MessageItem = ({
  message,
  currentUserId,
}: {
  message: MessageType;
  currentUserId: string;
}) => {
  const isCurrentUser = message.sender.id === currentUserId;
  const isPending = message.isPending;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const initialVisibleImages = 4;
  const [showAllImages, setShowAllImages] = useState(false);
  console.log(message);
 
  const toggleShowAllImages = () => {
    setShowAllImages(!showAllImages);
  };
  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className='mb-2'
      >
        <div className="flex flex-col">
          <motion.div
            className={`max-w-xs p-2 rounded-lg shadow-md 
          ${isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}
        `}
          >
            {!isCurrentUser && (
              <p className="text-xs font-semibold">{message.sender.name}</p>
            )}
            <p>{message.body}</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {message.imageUrls && message.imageUrls.length > 0 && (
                <>
                  {showAllImages
                    ? message.imageUrls.map((url: string, i: number) => (
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          key={i}
                          className="relative"
                        >
                          <Image
                            src={url}
                            alt="Chat image"
                            onClick={() => setSelectedImage(url)} // Open full image on click
                            className="rounded-lg cursor-pointer"
                            width={100}
                            height={100}
                          />
                        </motion.div>
                      ))
                    : message.imageUrls
                        .slice(0, initialVisibleImages)
                        .map((url: string, i: number) => (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            key={i}
                            className="relative"
                          >
                            <Image
                              src={url}
                              onClick={() => setSelectedImage(url)} // Open full image on click
                              alt="Chat image"
                              className="rounded-lg cursor-pointer"
                              width={100}
                              height={100}
                            />
                          </motion.div>
                        ))}
                  {message.imageUrls.length > initialVisibleImages && (
                    <button
                      className="text-sm text-yellow-400 underline cursor-pointer"
                      onClick={toggleShowAllImages}
                    >
                      {showAllImages
                        ? "Show less"
                        : `${message.imageUrls.length - initialVisibleImages} more`}
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
          <div className="flex gap-1 items-center">
            <p className="text-xs text-gray-900 mt-1">
              {formatTimestamp(new Date(message.createdAt))}
            </p>
            {isCurrentUser && (
              <p className="text-xs mt-1">
                {isPending ? (
                  <span className="text-gray-500">
                    <FaCheck />{" "}
                  </span>
                ) : (
                  <span className="text-blue-500">
                    {" "}
                    <FaCheck />
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </motion.div>
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
            className="relative bg-white      p-4 rounded-lg"
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
                className="text-white     bg-black p-2 rounded-full"
                onClick={() => window.open(selectedImage)}
              >
                <Expand />
              </button>
              <button
                className="text-white     bg-black p-2 rounded-full"
                onClick={async () => {
                  if (selectedImage) {
                    try {
                      const response = await fetch(selectedImage);
                      const blob = await response.blob();
                      const link = document.createElement("a");
                      const url = window.URL.createObjectURL(blob);
                      link.href = url;
                      link.setAttribute("download", "image.jpg"); // custom file name
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
    </>
  );
};

export default MessageItem;
