"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
interface Appointment {
  id: string;
  user: {
    image: {
      url: string;
    } | null;
    name: string | null;
    email: string | null;
  };
  date: Date;
  time: Date;
  expert: {
    image: {
      url: string;
    } | null;
    name: string | null;
  };
  status: string;
}

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get("/api/appointments");
        console.log(response.data);
        if (response.data.success) {
          setAppointments(response.data.appointments);
        }
      } catch (error) {
        console.error("APPOINTMENT_FETCH", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await axios.patch(`/api/appointments/${id}`, {
        status: newStatus,
      });
      if (response.data.success) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === id
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
        toast.success("Appointment status updated!");
      }
    } catch (error) {
      console.error("STATUS_UPDATE_ERROR", error);
      toast.error("Failed to update appointment status.");
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/appointments/${id}`);
      if (response.data.success) {
        setAppointments((prev) =>
          prev.filter((appointment) => appointment.id !== id)
        );
        toast.success("Appointment deleted!");
      }
    } catch (error) {
      console.error("DELETE_ERROR", error);
      toast.error("Failed to delete appointment.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading appointments...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Your Appointments
        </h1>
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-t">
                <td className="px-4 py-2 flex items-center">
                  <div className="relative w-10 h-10 rounded-full mr-4">
                    <Image
                      src={appointment.user.image?.url || "/images/profile.png"}
                      alt={appointment.user.name || "User"}
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <span>{appointment.user.name || "Unknown User"}</span>
                </td>
                <td className="px-4 py-2">
                  {format(new Date(appointment.date), "MMM dd, yyyy")}
                </td>
                <td className="px-4 py-2">
                  {format(new Date(appointment.time), "HH:mm")}
                </td>
                <td className="px-4 py-2">
                  <select
                    value={appointment.status}
                    onChange={(e) =>
                      handleStatusChange(appointment.id, e.target.value)
                    }
                    className="border rounded p-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentPage;
