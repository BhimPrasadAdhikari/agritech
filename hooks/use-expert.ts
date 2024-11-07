import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@prisma/client";


interface ExpertStore {
   expert: User | null;
  addExpert: (data: User) => void;
  removeAll: () => void;
}
const useExpert = create(
  persist<ExpertStore>(
    (set, get) => ({
      expert:null,
      addExpert: (data: User) => {
        set({ expert:{ ...data}});
        toast.success("added");
      },
      removeAll: () => set({ expert:null }),
    }),
    {
      name: "expert-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useExpert;
