import ImageUpload from "@/components/image-upload";
import { LoaderIcon } from "lucide-react";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

const MessageInput = ({
  onSendMessage,
}: {
  onSendMessage: (text: string, imageUrls: string[]) => void;
}) => {
  const [message, setMessage] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, imageUrls);
      setMessage("");
      setImageUrls([]);
    }
  };
  return (
    <div className="flex items-center p-2 bg-green-50 border-t border-green-300">
      <ImageUpload
        name="chat"
        disabled={false}
        value={imageUrls}
        onChange={(url) => setImageUrls((prev) => [...prev, url])}
        onRemove={(url) =>
          setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url))
        }
      />
      <input
        type="text"
        className="flex-grow p-2 rounded-md"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="p-2 text-green-700 hover:text-green-500"
      >
        {false ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          <AiOutlineSend size={24} />
        )}
      </button>
    </div>
  );
};

export default MessageInput;
