// components/BookingModal.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User,Image } from '@prisma/client';
interface BookingModalProps{
    expert:(User & {image:Image| null})
    onClose:()=>void;
}

const BookingModal:React.FC<BookingModalProps> = ({ expert, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleConfirm = () => {
    // Send appointment details to the server or handle the booking logic
    alert(`Appointment booked with ${expert.name} on ${date} at ${time}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Book Appointment with {expert.name}</h2>
        
        <label className="block text-green-700">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 p-2 border border-green-300 rounded"
        />
        
        <label className="block text-green-700">Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mb-4 p-2 border border-green-300 rounded"
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="text-green-600 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-700 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-green-600"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingModal;
