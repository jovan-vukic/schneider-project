import { Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import DeviceDataModal from "./common/DeviceDataModal";
import { generateDerId } from "../utils/deviceUtils";
import { Device } from "../models/Device";
import { CATEGORY_STRING_MAP, TYPE_STRING_MAP } from "../utils/constants";

const AddButton = ({ table }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addData, setAddData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (newDevice) => {
    if (isAdding) table.options.meta?.addRowData(newDevice);
  };

  const handleModalOpen = () => {
    setIsAdding(true);

    // Set the initial data
    setAddData(
      new Device({
        id: generateDerId(),
        name: "",
        type: TYPE_STRING_MAP[0],
        category: CATEGORY_STRING_MAP[0],
        maximumAvailablePower: "",
      })
    );

    // Open the modal
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

export default AddButton;
