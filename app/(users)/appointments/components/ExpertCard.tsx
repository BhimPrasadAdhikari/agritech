// components/ExpertCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Image as ImageType, User } from '@prisma/client';
interface ExpertCardProps{
    expert:(User & {image:ImageType| null})
    onBook:()=>void;
}
const ExpertCard:React.FC<ExpertCardProps> = ({ expert, onBook }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-lg rounded-lg overflow-hidden"
    >
        <div className='relative w-full h-48 '>
      <Image src={expert.image?.url || 'images/experts/profile.png'} alt={expert.name || "profile"} fill className="object-cover" />
      </div>
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold text-green-800">{expert.name}</h2>
        <p className="text-green-600 mb-4">{expert.expertise}</p>
        <button
          onClick={onBook}
          className="bg-green-700 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-green-600"
        >
          Book Appointment
        </button>
      </div>
    </motion.div>
  );
};

export default ExpertCard;
