import { Icon, IconButton, useDisclosure } from "@chakra-ui/react";

import DeleteIcon from "./icons/DeleteIcon";
import ConfirmModal from "./common/ConfirmModal";
import { useAuth } from "../providers/AuthProvider";

const DeleteButton = ({ row, table }) => {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  if (!isAdmin) {
    return null;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    await table.options.meta?.deleteRowData(row.index);

    onClose();
  };

  return (
    <>
      <IconButton
        isRound={true}
        variant="solid"
        colorScheme="red"
        size="sm"
        aria-label="Delete device"
        icon={<Icon as={DeleteIcon} fontSize="xl" />}
        onClick={onOpen}
      />

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this device?"
      />
    </>
  );
};

export default DeleteButton;
