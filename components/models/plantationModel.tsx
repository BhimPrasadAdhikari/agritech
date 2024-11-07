"use client";

import Modal from "@/components/ui/modal";
import PlantationForm from "../plantation-form";
import usePlantationModel from "@/hooks/use-plantation-model";

const PlantationModal = () => {
  const plantationModal = usePlantationModel();
  return (
    <Modal open={plantationModal.isOpen} onClose={plantationModal.onClose}>
      <PlantationForm />
    </Modal>
  );
};
export default PlantationModal;
