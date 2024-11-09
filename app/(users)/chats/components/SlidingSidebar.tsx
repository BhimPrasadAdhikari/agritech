// components/SlidingSidebar.tsx
import React from "react";
import { FaTimes } from "react-icons/fa";

interface SlidingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  title:string;
}

const SlidingSidebar: React.FC<SlidingSidebarProps> = ({ isOpen, onClose, content,title }) => {
  return (
    <div
      className={`absolute right-0 inset-0 z-20 h-full w-full text-black bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose} className="p-2 text-gray-600">
          <FaTimes />
        </button>
      </div>
      <div className="p-4">{content}</div>
    </div>
  );
};

export default SlidingSidebar;
