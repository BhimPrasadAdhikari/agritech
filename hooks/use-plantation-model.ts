import { create } from "zustand";

interface PlantationModelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const usePlantationModel = create<PlantationModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePlantationModel;
