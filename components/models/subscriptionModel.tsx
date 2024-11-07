"use client";

import Modal from "@/components/ui/modal";
import useSubscriptionModel from "@/hooks/use-subscription-model";
import SubscriptionPlans from "../SubscriptionPlans";
const SubscriptionModal = () => {
  const subscriptionModal = useSubscriptionModel();
  return (
    <Modal open={subscriptionModal.isOpen} onClose={subscriptionModal.onClose}>
<SubscriptionPlans/>
    </Modal>
  );
};
export default SubscriptionModal;
