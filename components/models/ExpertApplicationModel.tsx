"use client";

import Modal from "@/components/ui/modal";
import useExpertApplicationModel from "@/hooks/use-expertapplication-model";
import ExpertApplicationForm from "../ExpertApplicationForm";

const ExpertApplicationModel = () => {
  const ExpertApplicationModel = useExpertApplicationModel();
  return (
    <Modal open={ExpertApplicationModel.isOpen} onClose={ExpertApplicationModel.onClose}>
      <ExpertApplicationForm/>
    </Modal>
  );
};
export default ExpertApplicationModel;
