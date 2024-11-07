import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";


interface SubscriptionStore {
   subscription: {
    plan:string;
    price:number;

   }| null;
  addSubscription: (data: {
    plan:string;
    price:number;

   }) => void;
  removeAll: () => void;
}

const useSubscription = create(
  persist<SubscriptionStore>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set,get) => ({
      subscription:null,
      addSubscription: (data: {
        plan:string;
        price:number;
    
       }) => {
        set({ subscription:{ ...data}});
        toast.success("added");
      },
      removeAll: () => set({ subscription:null }),
    }),
    {
      name: "subscription-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSubscription;
