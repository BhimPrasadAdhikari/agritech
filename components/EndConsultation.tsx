"use client";

import { useState } from "react";
import axios from "axios";

type ConsultationProps = {
  consultationId: string;
};

const EndConsultationButton: React.FC<ConsultationProps> = ({
  consultationId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEndConsultation = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/consultation", {
        consultationId,
      });

      if (response.data.success) {
        alert("Consultation ended successfully");
      } else {
        setError("Failed to end consultation");
      }
    } catch (error) {
      console.error('CONSULTAION_POST',error)
      setError("An error occurred while ending the consultation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleEndConsultation}
        disabled={loading}
        className="bg-red-500 text-white dark:text-blackpx-4 py-2 rounded"
      >
        {loading ? "Ending..." : "End Consultation"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default EndConsultationButton;
