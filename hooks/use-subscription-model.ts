import { create } from "zustand";

interface SubscriptionModelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useSubscriptionModel = create<SubscriptionModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSubscriptionModel;
