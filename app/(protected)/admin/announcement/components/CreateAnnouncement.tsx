"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash, Edit3 } from "lucide-react";
import axios from "axios";
import { Announcement } from "@prisma/client";
import { format } from "date-fns";
import ImageUpload from "@/components/image-upload";
import Image from "next/image";
import toast from "react-hot-toast";

const CreateAnnouncement = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  useEffect(() => {
    fetchAnnouncements();
  }, []);
  const fetchAnnouncements = async () => {
    try {
      const { data } = await axios.get("/api/announcements");
      console.log(data);
      setAnnouncements(data.announcement);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const newAnnouncement = {
      title,
      description,
      imageUrl: image,
      startDate,
      endDate,
    };

    try {
      const { data } = await axios.post("/api/announcements", newAnnouncement);
      setAnnouncements([...announcements, data.announcement]);

      // Reset form fields
      setTitle("");
      setDescription("");
      setImage("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Failed to create announcement:", error);
    }
    // Optionally make an API call to save the announcement
    console.log("New announcement created:", newAnnouncement);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/announcements/${id}`);
      setAnnouncements(announcements.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete announcement:", error);
      toast.error("Failed to delete announcement:");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white      rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Announcement/Promotion</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex items-center">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <p>Choose Image</p>
          <ImageUpload
            disabled={loading}
            onChange={(url: string) => setImage(url)}
            onRemove={() => {}}
            value={[]}
          />

          {image && (
            <div className="relative w-16 h-16 p-2 rounded-md overflow-hidden">
              <Image
                src={image}
                alt="Preview"
                fill
                className="object-cover h-full w-full"
              />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
              required
            />
            {/* <CalendarDays className="absolute top-2 right-2 text-gray-400" /> */}
          </div>
          <div className="relative flex-1">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
              required
            />
            {/* <CalendarDays className="absolute top-2 right-2 text-gray-400" /> */}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white     rounded-md hover:bg-blue-700 transition disabled:cursor-not-allowed"
        >
          Create Announcement
        </motion.button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Existing Announcements</h3>
        {announcements.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow-md flex items-start gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                {announcement.imageUrl && (
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image
                      src={announcement.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover h-full w-full"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-bold">{announcement.title}</h4>
                  <p className="text-sm text-gray-600">
                    {announcement.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    From {format(new Date(announcement.startDate), "PP")} to{" "}
                    {format(new Date(announcement.endDate), "PP")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateAnnouncement;
