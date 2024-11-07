import { create } from "zustand";

interface ShipingModelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useShipingModel = create<ShipingModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useShipingModel;
