import { Input } from "@chakra-ui/react";
import { useState } from "react";

const EditableCell = ({ value }) => {
  const [newValue, setValue] = useState(value);

  return (
    <Input
      type="text"
      variant="filled"
      w="85%"
      size="sm"
      color="whiteAlpha.800"
      overflow="hidden"
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      value={newValue}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default EditableCell;
