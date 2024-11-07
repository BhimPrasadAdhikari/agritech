"use client";
import { FaCalendarAlt, FaUserMd } from "react-icons/fa"; // For icons
import { motion } from "framer-motion";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      {/* Take Appointment Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-600 text-white dark:text-blackp-4 rounded-full shadow-lg focus:outline-none"
        onClick={() => alert("Take Appointment")}
      >
        <FaCalendarAlt className="text-2xl" />
      </motion.button>

      {/* Chat with Expert Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white dark:text-blackp-1 rounded-full shadow-lg focus:outline-none"
        onClick={() => alert("Chat with Expert")}
      >
        <FaUserMd className="" />
      </motion.button>
    </div>
  );
};

export default FloatingButtons;
