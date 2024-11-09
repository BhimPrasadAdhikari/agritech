"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";

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
  expert: {
    name: string | null;
    email: string | null;
    image: {
      url: string;
    } | null;
  };
}

const ConsultPage = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConsultations() {
      try {
        const response = await axios.get("/api/consult");
        if (response.data.success) {
          setConsultations(response.data.consultations);
        }
      } catch (error) {
        console.error("CONSULT_FETCH", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchConsultations();
  }, []);

  const handleComplete = async (id: string) => {
    try {
      await axios.patch(`/api/consult/${id}`, { status: "completed" });
      setConsultations((prev) =>
        prev.map((consult) =>
          consult.id === id ? { ...consult, status: "completed" } : consult
        )
      );
      toast.success("Consultation marked as completed");
    } catch {
      toast.error("Failed to update consultation status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/consult/${id}`);
      setConsultations((prev) => prev.filter((consult) => consult.id !== id));
      toast.success("Consultation deleted");
    } catch {
      toast.error("Failed to delete consultation");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading consultations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Consultations</h1>
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b">User</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Time</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultations.length > 0 ? (
              consultations.map((consultation) => (
                <tr key={consultation.id} className="text-center">
                  <td className="py-3 px-4 border-b flex items-center justify-center space-x-3">
                    <div className="relative w-10 h-10 rounded-full">
                      <Image
                        src={
                          consultation.farmer.image?.url ||
                          "/images/profile.png"
                        }
                        fill
                        alt="User"
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div>
                      <p>{consultation.farmer.name}</p>
                      <p className="text-sm text-gray-500">
                        {consultation.farmer.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    {format(new Date(consultation.date), "PPP")}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {format(new Date(consultation.date), "p")}
                  </td>
                  <td className="py-3 px-4 border-b capitalize">
                    {consultation.status}
                  </td>
                  <td className="py-3 px-4 border-b space-x-3">
                    {consultation.status.toUpperCase() !== "COMPLETED" && (
                      <button
                        onClick={() => handleComplete(consultation.id)}
                        disabled={consultation.status === "Completed"}
                        className="px-4 py-2 my-2 bg-green-500 text-white rounded disabled:bg-gray-300"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(consultation.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No consultations available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultPage;
