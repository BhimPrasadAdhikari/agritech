"use client";

import Modal from "@/components/ui/modal";
import useExpertChatModel from "@/hooks/use-expertchat-model";
import ChatWithExpert from "../ChatWithExpert";
const ExpertChatModal = () => {
  const ExpertChatModal = useExpertChatModel();
  return (
    <Modal open={ExpertChatModal.isOpen} onClose={ExpertChatModal.onClose}>
      <ChatWithExpert expertName={ExpertChatModal.expertName} expertProfile={ExpertChatModal.expertProfile} />
    </Modal>
  );
};
export default ExpertChatModal;
