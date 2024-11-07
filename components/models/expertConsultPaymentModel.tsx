"use client";

import Modal from "@/components/ui/modal";
import useExpertConsultPaymentModel from "@/hooks/use-expertConsultPayment-model";
import ExpertConsultPayment from "../ExpertConsultPayment";
import { User } from "@prisma/client";

const ExpertConsultPaymentModal = () => {
  const ExpertConsultPaymentModal = useExpertConsultPaymentModel();
  return (
    <Modal open={ExpertConsultPaymentModal.isOpen} onClose={ExpertConsultPaymentModal.onClose}>
      <ExpertConsultPayment expert={ExpertConsultPaymentModal.expert as User} />
    </Modal>
  );
};
export default ExpertConsultPaymentModal;
