// components/VideoCallButton.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaVideo } from 'react-icons/fa';

interface VideoCallButtonProps {
  onStartCall: () => void;
}

const VideoCallButton: React.FC<VideoCallButtonProps> = ({ onStartCall }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
      onClick={onStartCall}
    >
      <FaVideo size={24} />
    </motion.button>
  );
};

export default VideoCallButton;
