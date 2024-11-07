"use client";
import AccountManagementModel from "@/components/models/AccountManagementModel";
import ExpertApplicationModel from "@/components/models/ExpertApplicationModel";
import ExpertChatModal from "@/components/models/expertChatModel";
import ExpertConsultPaymentModal from "@/components/models/expertConsultPaymentModel";
import PlantationModal from "@/components/models/plantationModel";
import ShippingModal from "@/components/models/shipping-modal";
import SubscriptionModal from "@/components/models/subscriptionModel";
import { useEffect, useState } from "react";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <SubscriptionModal/>
      <ShippingModal/>
      <PlantationModal />
      <ExpertChatModal/>
      <ExpertApplicationModel/>
      <AccountManagementModel/>
      <ExpertConsultPaymentModal/>
    </>
  );
};

export default ModalProvider;
