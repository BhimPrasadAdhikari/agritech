import { create } from "zustand";
interface ExpertConsultPaymentStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  expert:object | null;
  setExpert:( expert:object)=>void;
}
const useExpertConsultPaymentModel = create<ExpertConsultPaymentStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  expert:null,
  setExpert:(expert:object) => set({expert}),
}));
export default useExpertConsultPaymentModel;
