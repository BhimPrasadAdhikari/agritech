"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { User, Image as ImageType } from "@prisma/client";
import { motion } from "framer-motion";
import { format} from "date-fns";
import EndConsultationButton from "@/components/EndConsultation";
interface Consultation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  expertId: string;
  amount: number;
  date: Date;
  farmerId: string;
  commission: number;
  expert: User & { image: ImageType | null };
}
const ConsultPage = () => {
  const [consultations, setConsultations] = useState<Consultation[] | null>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchConsultations() {
      try {
        const response = await axios.get("/api/consult");
        if (response.data.success) {
          setConsultations(response.data.consultations);
          setLoading(false);
        }
      } catch (error) {
        console.error("CONSULT_FETCH", error);
        toast.error("something went wrong");
      }
    }
    fetchConsultations();
  }, []);
  if (loading) {
    return (
      <>
        <div className="min-h-screen  py-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <motion.div
                  className="bg-white dark:bg-black shadow-lg rounded-lg p-6 w-full h-48 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={idx}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-blue-300 rounded w-full"></div>
                </motion.div>
              ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Pending Consultations
          </h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {consultations && consultations.length > 0 ? (
              consultations.map((consultation) => {
                const consultationDate = new Date(consultation.date);
                return (
                  <motion.div
                    key={consultation.id}
                    className="bg-white dark:bg-black shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {consultation.expert.name}
                        </h2>
                        <p className="text-gray-500">
                          Consultation Date: {format(consultationDate, "PP")}
                        </p>
                      </div>
                    </div>

                    <EndConsultationButton consultationId={consultation.id}/>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">
                No pending consultations.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultPage;
