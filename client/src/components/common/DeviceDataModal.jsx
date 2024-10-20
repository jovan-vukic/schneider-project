import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";

import { TYPES } from "../../data.js";

const DeviceDataModal = ({
  isOpen,
  onClose,
  data,
  setData,
  onSave,
  isDisabled,
}) => {
  const [errors, setErrors] = useState({});

  /* Handle input field value change */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set data based on the field being changed
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "type"
          ? TYPES.find((t) => t.id === parseInt(value, 10))
          : value,
    }));

    // Reset validation error when user changes input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  /* Validation logic for input fields */
  const validate = () => {
    const newErrors = {};

    if (!data.name || data.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    if (!data.type || !data.type.id) {
      newErrors.type = "Type is required";
    }

    if (!data.derId || data.derId.trim() === "") {
      newErrors.derId = "DerId cannot be blank";
    }

    const maxAvailablePower = parseFloat(data.maxAvailablePower);
    if (
      isNaN(maxAvailablePower) ||
      maxAvailablePower < 0 ||
      maxAvailablePower > 100
    ) {
      newErrors.maxAvailablePower =
        "Maximum available power must be between 0 and 100";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(data);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>{isDisabled ? "Edit Device" : "Add Device"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* DER ID Field */}
          <FormControl isRequired mb={4} isInvalid={!!errors.derId}>
            <FormLabel>DER ID</FormLabel>
            <Input isDisabled name="derId" value={data.derId} />
            <FormErrorMessage>{errors.derId}</FormErrorMessage>
          </FormControl>

          {/* Device Name Field */}
          <FormControl isRequired mb={4} isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={data.name} onChange={handleChange} />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          {/* Device Type Field */}
          <FormControl isRequired mb={4} isInvalid={!!errors.type}>
            <FormLabel>Type</FormLabel>
            {isDisabled ? (
              <Input isDisabled name="type" value={data.type.name} />
            ) : (
              <Select
                name="type"
                value={data.type.id || ""}
                onChange={handleChange}
              >
                {TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Select>
            )}
            <FormErrorMessage>{errors.type}</FormErrorMessage>
          </FormControl>

          {/* Device Category Field */}
          {isDisabled && (
            <FormControl isRequired mb={4}>
              <FormLabel>Category</FormLabel>
              {<Input isDisabled name="category" value={data.category.name} />}
            </FormControl>
          )}

          {/* Max Available Output Power Field */}
          <FormControl isRequired mb={4} isInvalid={!!errors.maxAvailablePower}>
            <FormLabel>MAX Available Output Power</FormLabel>
            <Input
              name="maxAvailablePower"
              value={data.maxAvailablePower}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.maxAvailablePower}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeviceDataModal;
