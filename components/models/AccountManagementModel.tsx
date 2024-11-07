"use client";

import Modal from "@/components/ui/modal";
import AccountManagement from "../AccountManagement";
import useAccountManagementModel from "@/hooks/use-AccountManagement-model";

const AccountManagementModel = () => {
  const AccountManagementModel = useAccountManagementModel();
  return (
    <Modal open={AccountManagementModel.isOpen} onClose={AccountManagementModel.onClose}>
        <AccountManagement/>
    </Modal>
  );
};
export default AccountManagementModel;
