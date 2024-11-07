import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface userStore {
  info: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  };
  addItem: (data: {
    info: {
      firstName: string;
      lastName: string;
      phone: string;
      address: string;
    };
  }) => void;
  removeAll: () => void;
}

const useUser = create(
  persist<userStore>(
    (set, get) => ({
      info: {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
      },

      addItem: (data: {
        info: {
          firstName: string;
          lastName: string;
          phone: string;
          address: string;
        };
      }) => {
        const existingUser = get().info;
        if (
          existingUser.firstName == data.info.firstName &&
          existingUser.lastName == data.info.lastName &&
          existingUser.phone == data.info.phone
        ) {
          return toast("Already submitted");
        }
        set((prev) => ({
          info: {
            ...prev.info, // Spread the existing info
            ...data.info, // Add the new information
          },
        }));
        toast.success("User added"); // Show toast after successful update
      },
      removeAll: () =>
        set({ info: { firstName: "", lastName: "", phone: "", address: "" } }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useUser;
