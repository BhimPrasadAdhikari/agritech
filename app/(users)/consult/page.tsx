"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useExpert from "@/hooks/use-expert";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { format, isToday } from "date-fns";
import useExpertChatModel from "@/hooks/use-expertchat-model";
interface Consultation {
  id: string;
  date: Date;
  status: string;
  farmer: {
    name: string | null;
    email: string | null;
    image: {
      url: string;
    } | null;
  };
  expert:  {
    name: string | null;
    email: string | null;
    image: {
      url: string;
    } | null;
  };
};
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const ConsultPage = (props:{searchParams:SearchParams}) => {
  const searchParams = use(props.searchParams);
  const{data,status}= searchParams;
  const router = useRouter();
  const session = useSession();
  const expertStore = useExpert();
  const [consultations, setConsultations] = useState<Consultation[] | null>([]);
  const expert = expertStore.expert;
  const ExpertChatModel = useExpertChatModel();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchConsultations() {
      try {
        const response = await axios.get("api/consult");
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
  useEffect(() => {
    const base64String = data as string;

    const decodedData = base64String
      ? Buffer.from(base64String, "base64").toString("utf-8")
      : null;
    const parsedData = decodedData ? JSON.parse(decodedData) : null;

    const paymentStatus = (status as string )?.toUpperCase();
    const total_amount = expert ? expert.price : 0;

    // Check if the status is 'COMPLETED'
    if (paymentStatus === "COMPLETED" || parsedData?.status === "COMPLETE") {
      // Check if the request has already been made
      const hasRequested = sessionStorage.getItem("hasRequested");
      if (!hasRequested) {
        console.log(parsedData);

        // Make your POST request here
        const postData = {
          expertId: expert?.id,
          farmerId: session.data?.user.id,
          amount: total_amount,
          commission: total_amount ? 0.2 * total_amount : 0,
        };
        axios
          .post("/api/consult", postData)
          .then((response) => {
            if (response.data.success) {
              toast.success("Request successful!");
              sessionStorage.setItem("hasRequested", "true");
              expertStore.removeAll();
              router.push("/consult");
            }
          })
          .catch((error) => {
            console.error("Error making POST request", error);
            toast.error("Request failed!");
          });
      }
    }
  }, [data,status, expert, expertStore, router, session.data?.user]);

  const handleConsult = (expert:{ name: string | null; email: string | null; image: { url: string; } | null; }) => {
    const expertName = expert.name || "Expert";
    ExpertChatModel.setExpertName(expertName);
    ExpertChatModel.onOpen();
  };
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
                const today = isToday(consultationDate);

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
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 p-10">
                        <Image
                          src={
                            consultation.expert.image?.url ||
                            "/images/profile.png"
                          }
                          alt={
                            `${consultation.expert.name}'s picture` || "picture"
                          }
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">
                          {consultation.expert.name}
                        </h2>
                        <p className="text-gray-500">
                          Consultation Date: {format(consultationDate, "PP")}
                        </p>
                      </div>
                    </div>

                    {today ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConsult(consultation.expert)}
                        className="mt-4 w-full bg-blue-500 text-white dark:text-blackpy-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Consult Now
                      </motion.button>
                    ) : (
                      <p className="mt-4 text-gray-500 text-center">
                        Scheduled for: {format(consultationDate, "PPP")}
                      </p>
                    )}
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
