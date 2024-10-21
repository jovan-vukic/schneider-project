import { Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import DeviceDataModal from "./common/DeviceDataModal";
import { generateDerId } from "../utils/deviceUtils";
import { Device } from "../models/Device";
import {
  CATEGORY_STRING_MAP,
  TYPE_CATEGORY_MAP,
  TYPE_ICONS,
  TYPE_PHOTOVOLTAIC_PANEL,
  TYPE_STRING_MAP,
} from "../utils/constants";
import { PhotovoltaicPanel } from "../models/PhotovoltaicPanel";

const AddButton = ({ table }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addData, setAddData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = (newDevice) => {
    if (isAdding) table.options.meta?.addRowData(newDevice);
  };

  const handleModalOpen = async () => {
    setIsAdding(true);

    // Set the initial data
    const initialDevice = new PhotovoltaicPanel({
      derId: generateDerId(),
      icon: TYPE_ICONS[TYPE_PHOTOVOLTAIC_PANEL.id],
      name: "",
      type: TYPE_PHOTOVOLTAIC_PANEL,
      category: TYPE_CATEGORY_MAP[TYPE_PHOTOVOLTAIC_PANEL.id],
    });

    console.log("Initial device:", initialDevice);

    setAddData(initialDevice);

    // Open the modal
    onOpen();
  };

  return (
    <>
      <Button
        colorScheme="yellow"
        size="sm"
        onClick={async () => await handleModalOpen()}
      >
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
