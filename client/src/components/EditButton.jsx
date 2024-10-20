import { Button, Icon } from "@chakra-ui/react";

import EditIcon from "./icons/EditIcon";

const EditButton = ({ row }) => {
  const handleEdit = (rowIndex) => {
    console.log("Edit row: ", rowIndex);
  };

  return (
    <Button
      colorScheme="red"
      size="sm"
      leftIcon={<Icon as={EditIcon} fontSize="xs" />}
      onClick={() => handleEdit(row.index)}
    >
      Edit
    </Button>
  );
};

export default EditButton;
