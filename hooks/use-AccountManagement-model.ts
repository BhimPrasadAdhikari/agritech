import { create } from "zustand";
interface ExpertApplicationModelModelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useAccountManagementModel = create<ExpertApplicationModelModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useAccountManagementModel;
