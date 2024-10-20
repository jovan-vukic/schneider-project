import { Icon, IconButton } from "@chakra-ui/react";
import { useState } from "react";

import DeleteIcon from "./icons/DeleteIcon";

const DeleteButton = ({ row, table }) => {
  const handleDelete = () => {
    table.options.meta?.deleteRowData(row.index);
  };

  return (
    <IconButton
      isRound={true}
      variant="solid"
      colorScheme="red"
      size="sm"
      aria-label="Delete device"
      icon={<Icon as={DeleteIcon} fontSize="xl" />}
      onClick={() => handleDelete()}
    />
  );
};

export default DeleteButton;
