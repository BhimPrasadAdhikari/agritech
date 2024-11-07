"use client";

import { ShipingForm } from "@/components/shiping-form";
import useShipingModel from "@/hooks/use-shiping-model";
import Modal from "@/components/ui/modal";

const ShippingModal = () => {
  const shipingModal = useShipingModel();
  return (
    <Modal open={shipingModal.isOpen} onClose={shipingModal.onClose}>
      <ShipingForm />
    </Modal>
  );
};

export default ShippingModal;
