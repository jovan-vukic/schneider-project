import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import EditIcon from "./icons/EditIcon";
import ViewIcon from "./icons/ViewIcon";
import DeviceDataModal from "./common/DeviceDataModal";
import { useAuth } from "../providers/AuthProvider";

const EditViewButton = ({ row, table }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editData, setEditData] = useState(null);

  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const handleSave = async (updatedData) => {
    // Update the local data and the data in the table
    await table.options.meta?.updateRowData(updatedData);
  };

  const handleModalOpen = () => {
    setEditData(row.original);
    onOpen();
  };

  return (
    <>
      <Button
        colorScheme={isAdmin ? "green" : "yellow"}
        size="sm"
        leftIcon={<Icon as={isAdmin ? EditIcon : ViewIcon} fontSize="xs" />}
        onClick={handleModalOpen}
      >
        {isAdmin ? "Edit" : "View"}
      </Button>

      {isOpen && editData && (
        <DeviceDataModal
          isOpen={isOpen}
          onClose={onClose}
          data={editData}
          setData={setEditData}
          onSave={handleSave}
          isDisabled
        />
      )}
    </>
  );
};

export default EditViewButton;
