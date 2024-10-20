import { Button, Icon, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import EditIcon from "./icons/EditIcon";
import DeviceDataModal from "./DeviceDataModal";

const EditButton = ({ row, table }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editData, setEditData] = useState(null);

  const handleSave = (updatedData) => {
    // Update the local data and the data in the table
    table.options.meta?.updateRowData(row.index, updatedData);
  };

  const handleModalOpen = () => {
    setEditData(row.original);
    onOpen();
  };

  return (
    <>
      <Button
        colorScheme="green"
        size="sm"
        leftIcon={<Icon as={EditIcon} fontSize="xs" />}
        onClick={handleModalOpen}
      >
        Edit
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

export default EditButton;
