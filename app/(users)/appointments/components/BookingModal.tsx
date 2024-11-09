// components/BookingModal.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Image } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
interface BookingModalProps {
  expert: User & { image: Image | null };
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ expert, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const session = useSession();

  const handleSubmit = async () => {
    const selectedDate = new Date(date);
    const selectedTime = new Date();
    const [hours, minutes] = time.split(":");
    selectedTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    console.log()
    try {
      await axios.post("/api/appointments", {
        userId: session.data?.user.id,
        expertId: expert.id,
        date:selectedDate.toISOString(),
        time:selectedTime.toISOString(),
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Book Appointment with {expert.name}
        </h2>

        <label className="block text-green-700">Date:</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 p-2 border border-green-300 rounded"
        />

        <label className="block text-green-700">Time:</label>
        <Input
          type="time"
          
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mb-4 p-2 border border-green-300 rounded"
        />
        <div className="flex justify-between mt-6">
          <Button onClick={onClose} className="text-green-600 hover:underline">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-green-600"
          >
            Confirm Appointment
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingModal;
