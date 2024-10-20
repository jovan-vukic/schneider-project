import { Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import DeviceDataModal from "./DeviceDataModal";
import { TYPE_CATEGORY_MAP, TYPE_ICONS, TYPES } from "../data";

const EditButton = ({ row, table }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addData, setAddData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const generateDerId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
    const derId = `${timestamp}-${random}`; // Combine the timestamp and random number to create a unique ID
    return derId;
  };

  const handleSave = (newDevice) => {
    if (isAdding) {
      newDevice.icon = TYPE_ICONS[newDevice.type.id];
      newDevice.category = TYPE_CATEGORY_MAP[newDevice.type.id];

      console.log(newDevice ? newDevice : "No data to add");

      // Update the local data and the data in the table
      table.options.meta?.addRowData(newDevice);
    }
  };

  const handleModalOpen = () => {
    setIsAdding(true);

    setAddData({
      derId: generateDerId(),
      name: "",
      type: TYPES.find((t) => t.id === 1),
      category: TYPE_CATEGORY_MAP[TYPES.find((t) => t.id === 1).id],
      maxAvailablePower: "",
    });
    onOpen();
  };

  return (
    <>
      <Button colorScheme="yellow" size="sm" onClick={handleModalOpen}>
        Add Device
      </Button>

      {isOpen && addData && (
        <DeviceDataModal
          isOpen={isOpen}
          onClose={() => {
            setIsAdding(false);
            onClose();
          }}
          data={addData}
          setData={setAddData}
          onSave={handleSave}
          isDisabled={false}
        />
      )}
    </>
  );
};

export default EditButton;
