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
} from "@chakra-ui/react";
import { TYPES, CATEGORIES } from "../data.js";

const DeviceDataModal = ({
  isOpen,
  onClose,
  data,
  setData,
  onSave,
  isDisabled,
}) => {
  /* Handle input field value change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Edit Device</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={4}>
            <FormLabel>DER ID</FormLabel>
            <Input isDisabled={isDisabled} name="derId" value={data.derId} />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={data.name} onChange={handleChange} />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Type</FormLabel>
            {isDisabled ? (
              <Input
                isDisabled={isDisabled}
                name="type"
                value={data.type.name}
              />
            ) : (
              <Select name="type" value={data.type.id} onChange={handleChange}>
                {TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Select>
            )}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            {isDisabled ? (
              <Input
                isDisabled={isDisabled}
                name="category"
                value={data.category.name}
              />
            ) : (
              <Select
                name="category"
                value={data.category.id}
                onChange={handleChange}
              >
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            )}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>MAX Available Output Power</FormLabel>
            <Input
              name="maxAvailablePower"
              value={data.maxAvailablePower}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={() => onSave(data)}>
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