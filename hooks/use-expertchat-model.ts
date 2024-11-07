import { create } from "zustand";
interface ExpertChatModelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  expertName:string | null;
  expertProfile:string |null;
  setExpertName:(name:string | null)=>void;
  setExpertProfile:(url:string | null)=>void;
}
const useExpertChatModel = create<ExpertChatModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  expertName:'',
  expertProfile:'',
  setExpertProfile:(url:string | null)=>set({expertProfile:url}),
  setExpertName:(name:string | null) => set({expertName:name}),
}));
export default useExpertChatModel;
