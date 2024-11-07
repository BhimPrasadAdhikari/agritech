/* eslint-disable @typescript-eslint/no-unused-vars */
// components/AppointmentBooking.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import ExpertCard from './ExpertCard';
import BookingModal from './BookingModal';
import axios from "axios";
import { Image, User } from "@prisma/client";
const AppointmentBooking = ({ currentUserId }:{currentUserId:string}) => {
  const [experts, setExperts] = useState<(User & { image: Image | null})[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<(User & { image: Image | null})| null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await axios.get("/api/experts");
        if(response.data.success) setExperts(response.data.experts);
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    };
    fetchExperts();
  }, []);

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
    await axios.post("/api/appointments", {
        userId: currentUserId,
        expertId: selectedExpert,
        date,
        time,
      });
      setStatus("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      setStatus("Failed to book appointment.");
    }
  };
  return (
    <div className="bg-green-100 min-h-screen p-8">
    <h1 className="text-4xl font-semibold text-center text-green-800 mb-8">Book an Appointment with Agro Experts</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {experts.map((expert) => (
        <ExpertCard
          key={expert.id}
          expert={expert}
          onBook={() => setSelectedExpert(expert)}
        />
      ))}
    </div>

    {selectedExpert && (
      <BookingModal expert={selectedExpert} onClose={() => setSelectedExpert(null)} />
    )}
  </div>

  );
};

export default AppointmentBooking;
